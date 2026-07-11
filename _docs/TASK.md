# AIPEDIA Task Management

Notes:
- (me) -> Means me (Aji) who will works on, other than that, it's you AI Agents
- System Prompt -> CustomGPT who will write inside: `_docs/prompts/system/<character>.txt`
- generate -> need AI
- create -> just run script or manual create

## General

- [x] Now, our source of truth task is `_docs/TASK.md`, please update in rules
- [x] We should make a clear that this project is mainly for CustomGPT, which is we have to think about component like: system prompt, conversation starter, context that need to know, etc
- [x] Add 1 field `_docs/database/assistants.json` in that will have array for 3 starter conversations for CustomGPT
- [x] Should we rename system prompt into CustomGPT?

## Change Assistant role 

- [x] Rename  Milo to Wilo and Change the role, from Email Marketing Asisten to Website Asisten
    - [x] Rename Milo to Wilo
    - [x] Create System Prompt
    - [x] What Context need for this? In the first Conversation?
    - [] Update CustomGPT (me)

- [x] Change Prima role from Prompt Generator to Operation SOP Asisten
    - [x] Define Role and scope for Indonesian Business
    - [x] What Context need for this? In the first Conversation?
    - [x] Create System Prompt
    - [] Update CustomGPT (me)

---

## Add another 5 Asistan
The ideas is make this project from 12 asistant to 17 asistant, since Indonesian people have a good psychology with number 17, and arguably it' safe from klenik: Chinese culture, western culture, and Javanese Culture in terms of Bala

*Please Duplicate this based on newer 5 Asistants (gita, wanda, loka, lila, tira)
- [x] Generate New Asistant Data (me)
- [x] Generate Prompt LLM: Define scope, define context needed for conversations, Follow other prompt structure in `_docs/prompts/system` just pick 1 or 2 and make sure it does follows
- [x] Prepare CustomGPT conversation starter (3) -- New field btw
- [x] Create Prompt Visual Character
- [x] Generate Visual char (me)
    - [x] gita
    - [x] wanda
    - [x] loka
    - [x] lila
    - [x] tira
- [] Create CustomGPT (me)
    - [] gita
    - [] wanda
    - [] loka
    - [] lila
    - [] tira
- [x] Add to ASISTANT.md
