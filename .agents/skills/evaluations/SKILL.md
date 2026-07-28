---
name: Evaluate AIPEDIA Specialist
description: Use this skill to evaluate or audit the quality of an AIPEDIA AI Specialist against marketing claims and acceptance criteria.
---

# Instructions

When you are asked to evaluate, test, or audit the quality of an AIPEDIA AI Specialist (whether it's a CustomGPT prompt or a Codex/Claude skill), you MUST follow this standardized QA process:

1. **Read the Scenarios:** Open and read `references/aipedia-scenarios.md` to understand the specific acceptance criteria, expected inputs, and expected quality of outputs for the target specialist.
2. **Follow the Audit Checklist:** Open and read `references/specialist_audit.md` for the step-by-step audit workflow (testing 3 real-case prompts).
3. **Analyze the Gap:** Compare the AI's actual output against the marketing claims written in the `assistants.json` database.
4. **Actionable Report:** Present your findings to the user. Clearly state if the specialist passes the criteria. If there is a gap (e.g., claiming automation but only providing templates), provide a clear decision: (a) suggest a prompt fix to meet the claim, or (b) suggest revising the marketing claim to match the actual capability.
