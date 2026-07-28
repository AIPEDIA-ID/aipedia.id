---
name: Generate Codex Skill
description: Use this skill to generate, update, or refine a SKILL.md file for a Codex/Claude plugin skill.
---

# Instructions

When asked to generate or update a Codex or Claude skill (plugin), you MUST follow the engineering rules specified for this project.

1. **Read the Rules**: Read the file `references/rules.md` in this skill directory to understand the YAML frontmatter requirements, conciseness constraints, and linking conventions.
2. **Read the Database**: Check `_docs/database/assistants.json` for context if needed.
3. **Generate the Skill**: Create the SKILL.md file following the structure outlined in the rules. Ensure it is concise, actionable, and instructs the AI to respond in Bahasa Indonesia.
4. **Output Location**: Save the output to `products/skills/codex/skills/<skill_name>/SKILL.md` or the respective claude directory.
