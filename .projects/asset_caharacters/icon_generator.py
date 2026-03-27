import csv

PROMPT_GENERATOR = """
Create a glossy, chibi 3D robot mascot named "{name}", infer gender expression as "{gender}" and persona from the name; keep it friendly, competent, and trustworthy for an AI Employee Assistant brand used in tools like "BMC Assistant" and "Meta Ads Assistant" [7][10][16].
Primary theme color = {tema_warna} (hex); apply as dominant body panels, trims, and accents with neutral complements (charcoal gray, slate, white) for contrast and accessibility [16][10][7].
Design: rounded shapes, soft bevels, face as black glass display with cyan glow eyes, welcoming open-arm pose, clean silhouette readable at small sizes (icon usage) [16][10][7].
Accessories driven by '{description}': add optional tools/props, UI glyphs, or wearables that communicate the role without text (e.g., analytics icons, dashboards, checklists), but keep minimalist and brand-safe [16][10][7].
Background/output: isolated subject on transparent background, export as PNG RGBA with real alpha channel; no backdrop, no floor, no drop shadow, no watermark, no text, no logo [3][12][9].
Lighting/render: studio softbox reflections, subtle rim light, high dynamic range look, crisp edges, 4k detail; avoid noisy patterns that break alpha edges [3][6][9].
Framing: centered, full-body, slight 3/4 angle, ample padding for cropping into square/round app icons [16][10][7].
If the model cannot output native transparency, generate on solid white or green and prepare clean matting for downstream background removal (keep hard separation from background) [3][15][4].
Style constraints: no weapons, no text, no letters, no background scenes; focus on a reusable, modular mascot asset with consistent proportions for a design system [16][10][7].
"""

input_csv = './variables.csv'
output_txt = './prompts.txt'

with open(input_csv, mode='r', encoding='utf-8-sig') as infile, open(output_txt, mode='w', encoding='utf-8') as outfile:
    reader = csv.DictReader(infile)
    for row in reader:
        name = row.get('name', '').strip()
        description = row.get('Description', '').strip()
        tema_warna = row.get('tema warna', '').strip()
        gender = row.get('gender', '').strip()
        
        prompt = PROMPT_GENERATOR.format(
            name=name,
            description=description,
            tema_warna=tema_warna,
            gender=gender
        )
        outfile.write(prompt)
        outfile.write('\n\n\n')

print('Prompts generated successfully!')
