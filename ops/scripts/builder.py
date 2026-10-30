#!/usr/bin/env python3
import os
import sys
import yaml
import shutil
import subprocess
import tempfile
import argparse

# Paths
OPS_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
PROJECT_ROOT = os.path.abspath(os.path.join(OPS_DIR, ".."))
PRODUCTS_DIR = os.path.join(OPS_DIR, "products")
PUBLIC_CHAR_DIR = os.path.join(PROJECT_ROOT, "public/character")
SKILLS_SRC_DIR = os.path.join(PRODUCTS_DIR, "skills/codex/skills")
CODEX_PLUGIN_DIR = os.path.join(PRODUCTS_DIR, "skills/codex")
DELIVERY_DIR = os.path.join(OPS_DIR, "delivery")
MANAGER_SCRIPT = os.path.join(os.path.dirname(__file__), "manager.py")

def run_cmd(cmd, cwd=PROJECT_ROOT):
    print(f"Executing: {cmd}")
    res = subprocess.run(cmd, shell=True, cwd=cwd)
    if res.returncode != 0:
        print(f"Error executing command: {cmd}")
        sys.exit(res.returncode)

def main():
    parser = argparse.ArgumentParser(description="Aipedia Product Builder")
    parser.add_argument("campaign", help="Target campaign/package to build (e.g., basic, pro, tira, mita)")
    args = parser.parse_args()

    # Load router config
    router_path = os.path.join(PRODUCTS_DIR, "router.yaml")
    if not os.path.exists(router_path):
        print(f"Error: router.yaml not found at {router_path}")
        sys.exit(1)

    with open(router_path, "r", encoding="utf-8") as f:
        config = yaml.safe_load(f)

    packages = config.get("packages", {})
    if args.campaign not in packages:
        print(f"Error: Campaign '{args.campaign}' not defined in router.yaml")
        print(f"Available campaigns: {', '.join(packages.keys())}")
        sys.exit(1)

    pkg = packages[args.campaign]
    pkg_name = pkg.get("name", args.campaign)
    output_zip = pkg.get("output_zip", f"aipedia-{args.campaign}.zip")
    documents = pkg.get("documents", [])
    assistants = pkg.get("assistants", "all")
    include_skills = pkg.get("include_skills", False)
    include_codex = pkg.get("include_codex", False)

    print("==================================================")
    print(f"    Building {pkg_name} ({args.campaign})")
    print("==================================================")

    # Setup output directories
    campaign_out = os.path.join(DELIVERY_DIR, args.campaign)
    shutil.rmtree(campaign_out, ignore_errors=True)
    os.makedirs(campaign_out, exist_ok=True)

    # Generate ASISTANT.md based on assistants rule
    if assistants == "all":
        print("=> Generating full ASISTANT.md")
        run_cmd(f"python3 {MANAGER_SCRIPT} generate-docs")
    elif isinstance(assistants, list):
        ids_str = ",".join(assistants)
        print(f"=> Generating filtered ASISTANT.md for: {ids_str}")
        run_cmd(f"python3 {MANAGER_SCRIPT} generate-docs --only {ids_str}")
    else:
        print("=> Generating full ASISTANT.md (default)")
        run_cmd(f"python3 {MANAGER_SCRIPT} generate-docs")

    # Temporarily adjust image paths in ASISTANT.md for PDF generation
    asistant_md_path = os.path.join(PRODUCTS_DIR, "guide", "ASISTANT.md")
    backup_md_path = asistant_md_path + ".bak"
    adjusted_paths = False

    if os.path.exists(asistant_md_path):
        with open(asistant_md_path, "r", encoding="utf-8") as f:
            content = f.read()
        
        if "../public" in content:
            print("=> Adjusting image paths in ASISTANT.md for PDF generation...")
            shutil.copyfile(asistant_md_path, backup_md_path)
            adjusted_content = content.replace("../public", "../../../public")
            with open(asistant_md_path, "w", encoding="utf-8") as f:
                f.write(adjusted_content)
            adjusted_paths = True

    try:
        # Install Chrome for Puppeteer if needed
        print("=> Installing Chrome for Puppeteer if needed...")
        run_cmd("npx -y puppeteer browsers install chrome")

        # Compile PDF documents
        print("=> Generating PDFs...")
        pdf_files = []
        for doc in documents:
            doc_path = os.path.join(PROJECT_ROOT, doc)
            if not os.path.exists(doc_path):
                alt_path = os.path.join(OPS_DIR, doc)
                if os.path.exists(alt_path):
                    doc_path = alt_path
                else:
                    alt_path2 = os.path.join(PRODUCTS_DIR, doc.replace("products/", "").replace("ops/products/", ""))
                    if os.path.exists(alt_path2):
                        doc_path = alt_path2
                    else:
                        print(f"Warning: Document not found: {doc_path}")
                        continue
            print(f"   Compiling {doc_path} to PDF...")
            run_cmd(f"npx -y md-to-pdf {doc_path}")
            pdf_path = os.path.splitext(doc_path)[0] + ".pdf"
            if os.path.exists(pdf_path):
                pdf_files.append(pdf_path)

        # Copy PDFs to output folder
        for pdf_path in pdf_files:
            shutil.copy(pdf_path, campaign_out)
            # Remove original PDF so we don't pollute the guide directory
            os.remove(pdf_path)

    finally:
        # Restore backup if adjusted
        if adjusted_paths and os.path.exists(backup_md_path):
            shutil.move(backup_md_path, asistant_md_path)

    # 4. Handle Skills Zipping
    skills_out_dir = os.path.join(campaign_out, "skills")
    if include_skills:
        os.makedirs(skills_out_dir, exist_ok=True)
        # Determine which skills to copy
        all_skills = os.listdir(SKILLS_SRC_DIR)
        target_skills = []
        
        if include_skills == "all" or include_skills is True:
            target_skills = [s for s in all_skills if os.path.isdir(os.path.join(SKILLS_SRC_DIR, s))]
        elif isinstance(include_skills, list):
            target_skills = [s for s in include_skills if s in all_skills and os.path.isdir(os.path.join(SKILLS_SRC_DIR, s))]

        print(f"=> Packaging skills: {', '.join(target_skills)}")
        for skill_name in target_skills:
            skill_src = os.path.join(SKILLS_SRC_DIR, skill_name)
            with tempfile.TemporaryDirectory() as tmp_skill_dir:
                # Copy skill files
                shutil.copytree(skill_src, tmp_skill_dir, dirs_exist_ok=True)
                
                # Copy icon if exists
                icon_src = os.path.join(PUBLIC_CHAR_DIR, f"{skill_name}.png")
                if os.path.exists(icon_src):
                    shutil.copy(icon_src, os.path.join(tmp_skill_dir, "icon.png"))
                
                # Zip the temporary folder to campaign skills directory
                skill_zip_path = os.path.join(skills_out_dir, f"{skill_name}")
                shutil.make_archive(skill_zip_path, 'zip', tmp_skill_dir)

    # 5. Handle Codex Plugin Marketplace
    marketplace_out_dir = os.path.join(campaign_out, "codex-plugin-marketplace")
    if include_codex:
        print("=> Assembling Codex plugin marketplace...")
        with tempfile.TemporaryDirectory() as tmp_marketplace:
            # Copy base plugin directory
            shutil.copytree(CODEX_PLUGIN_DIR, tmp_marketplace, dirs_exist_ok=True)
            
            # Verify plugin.json exists and is valid
            plugin_json = os.path.join(tmp_marketplace, ".codex-plugin", "plugin.json")
            if not os.path.exists(plugin_json):
                print(f"Error: Missing {plugin_json}")
                sys.exit(1)
            
            # Lint plugin.json using python json tool
            run_cmd(f"python3 -m json.tool {plugin_json} > /dev/null")
            
            # Filter skills inside the plugin marketplace to match target skills
            mp_skills_dir = os.path.join(tmp_marketplace, "skills")
            if os.path.exists(mp_skills_dir):
                all_mp_skills = os.listdir(mp_skills_dir)
                
                # If we filter skills, remove those not in target_skills list
                if isinstance(include_skills, list):
                    for s in all_mp_skills:
                        if s not in include_skills:
                            s_path = os.path.join(mp_skills_dir, s)
                            if os.path.isdir(s_path):
                                shutil.rmtree(s_path)
                            elif os.path.isfile(s_path):
                                os.remove(s_path)

                # Verify each remains has a SKILL.md
                for s in os.listdir(mp_skills_dir):
                    s_path = os.path.join(mp_skills_dir, s)
                    if os.path.isdir(s_path):
                        skill_md = os.path.join(s_path, "SKILL.md")
                        if not os.path.exists(skill_md):
                            print(f"Error: missing SKILL.md in marketplace skill: {s}")
                            sys.exit(1)

            # Move assembled marketplace to output directory
            shutil.copytree(tmp_marketplace, marketplace_out_dir)

    # 6. Single ZIP Archive creation
    print("=> Creating final ZIP Archive...")
    final_zip_base = os.path.join(campaign_out, os.path.splitext(output_zip)[0])
    
    # We zip everything inside campaign_out into the final ZIP
    # Find all items to zip
    zip_items = os.listdir(campaign_out)
    
    # We run zip via command line to avoid nested structure issues in zip
    zip_cmd = f"zip -r {output_zip} " + " ".join(zip_items)
    run_cmd(zip_cmd, cwd=campaign_out)

    # Clean up unzipped files, leaving only the final ZIP
    for item in zip_items:
        item_path = os.path.join(campaign_out, item)
        if item != output_zip:
            if os.path.isdir(item_path):
                shutil.rmtree(item_path)
            else:
                os.remove(item_path)

    print("==================================================")
    print(f"    Build Complete! Packages are ready in:")
    print(f"    {os.path.join(campaign_out, output_zip)}")
    print("==================================================")

if __name__ == "__main__":
    main()
