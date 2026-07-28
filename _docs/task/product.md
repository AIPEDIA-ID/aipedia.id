# Product

Notes:
- (me) -> Means me (Aji) who will works on, other than that, it's you AI Agents
- System Prompt -> CustomGPT who will write inside: `_docs/prompts/system/<character>.txt`
- generate -> need AI
- create -> just run script or manual create

# Product

## General

- [x] Now, our source of truth task is `_docs/TASK.md`, please update in rules
- [x] We should make a clear that this project is mainly for CustomGPT, which is we have to think about component like: system prompt, conversation starter, context that need to know, etc
- [x] Add 1 field `_docs/database/assistants.json` in that will have array for 3 starter conversations for CustomGPT
- [x] Should we rename system prompt into CustomGPT?

## Change Specialist role 

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

## Setup Mita Campaign
- [x] Create PRD Mita-X (`_docs/campaign/MITA.md`)
- [x] Create Landing Page for Mita
- [x] Update SSOT for Mita
- [x] Generate visual for Mita
- [ ] Ensure Mita delivery package is ready (Mita CustomGPT + 6 Skills)

## Setup Tira x Fina Campaign
- [x] Create PRD Tira (`_docs/campaign/TIRA.md`)
- [ ] Create Landing Page for Tira x Fina Bundle
- [ ] Generate visual for Tira & Fina
- [ ] Setup Tira Skills & Prompts in `products/tira-x/`
- [ ] Ensure Tira delivery package is ready (Tier 1: Tira Only, Tier 2: Tira + Fina + Bundle)

## Build Automation
- [ ] Update `build.sh` and `manager.py` to support generating deliverables for single-product campaigns (e.g. TIRA only, MITA only) rather than just the full bundle.

---
## Create Claude Plugin
- [ ] Create Claude Plugin
- [ ] Testing

