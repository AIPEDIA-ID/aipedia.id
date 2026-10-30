# Language Convention Rule

## Rule: Mandatory English for Codebase Outside `_docs` and `ops`

All technical code, files, documentation, and artifacts located **outside** of `_docs/` and `ops/` **MUST** be written in **English**.

### Scope & Guidelines:
1. **Source Code (`src/`, `db/`, `test/`, configs)**:
   - All variable names, functions, classes, interfaces, types, and constants must use clear English.
   - All code comments, inline explanations, JSDoc/TSDoc, and docstrings must be in English.
   - Error messages, logs, and developer-facing debug strings must be in English.
2. **Project & Developer Documentation**:
   - Technical READMEs, commit messages, PR descriptions, and architecture notes outside `_docs` must be in English.
3. **Exceptions**:
   - `_docs/`: Business strategies, executive summaries, marketing workflows, and the master database (`database/assistants.json`) for the Indonesian market can use Indonesian.
   - `ops/`: Operations, customer-facing delivery packaging for Indonesian businesses (e.g., CustomGPT prompts, Indonesian buyer guides), and social media content generators targeting Indonesian platforms may use Indonesian where appropriate.
   - **Customer-facing Website Copy**: Content strings specifically rendered for the end-user on https://aipedia.id (e.g. Indonesian marketing copy, Indonesian catalog descriptions) may remain in Indonesian as required by product specifications.
