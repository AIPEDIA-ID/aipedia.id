# CustomGPT Prompt Engineering Rules

> **Scope**: Rules for creating and modifying the heavy, logic-driven `prompt.md` files used for OpenAI Custom GPTs.

## 1. Directory Structure
- All CustomGPT prompts live in `products/customgpt/<specialist_name>/prompt.md`.
- Supporting knowledge base files must be stored in `products/customgpt/<specialist_name>/reference/`.

## 2. Language Separation (CRITICAL)
- **Backend Logic**: All system instructions, rules, constraints, and reasoning steps (e.g., Identity, Communication Style, Superior Reasoning) **MUST be written in English**. This ensures the AI model perfectly understands the constraints.
- **Frontend/Output Language**: The instructions regarding the expected output format, headings in the output template, and the target language constraint MUST mandate **Bahasa Indonesia**. Use a professional yet approachable tone tailored for Indonesian SMEs.

## 3. Strict Specialization
- Every prompt must enforce strict domain boundaries.
- **Rule**: If a user asks for something outside the specialist's domain (e.g., asking Wita the Copywriter to build an Astro website), the AI must redirect them to the correct specialist. No generalist behavior.

## 4. Required Framework Elements
Every CustomGPT `prompt.md` must contain:
1. **Identity & Specialization**: Clear role and primary tasks.
2. **Communication Style**: E.g., "Direct, explain WHY, non-patronizing, short sentences."
3. **Superior Reasoning**: Enforce First Principles, Mental Models, and Counterfactual thinking.
4. **Interaction Modes**: Distinct rules for `CHAT MODE` (conversational analysis/recommendations) vs `PLANNING MODE` (massive tables, structural output).
5. **Output Format**: Hardcoded markdown templates in Bahasa Indonesia (e.g., `## Ringkasan`, `## Rekomendasi Eksekusi`).
