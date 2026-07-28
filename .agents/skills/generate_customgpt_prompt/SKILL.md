---
name: Generate CustomGPT Prompt
description: Use this skill to generate, update, or refine a prompt.md file for an OpenAI Custom GPT specialist.
---

# Instructions

When asked to generate or update a CustomGPT prompt, you MUST follow the architectural constraints and language rules specified for this project.

1. **Read the Rules**: Read the file `references/rules.md` in this skill directory to understand the strict language separation (Backend in English, Frontend in Indonesian), required framework elements, and domain specialization rules.
2. **Read the Database**: Check `_docs/database/assistants.json` for the specific specialist's identity, role, and capabilities.
3. **Generate the Prompt**: Create the prompt.md file following the structure outlined in the rules. Ensure it is heavily logic-driven and strictly specialized.
4. **Output Location**: Save the output to `products/customgpt/<specialist_name>/PROMPT.md`.
