.PHONY: help agent-status agent-sync agent-prompt agent-compress

help:
	@echo "Aipedia.id Makefile Commands:"
	@echo "--------------------------------------------------------"
	@echo "make agent-status   : Cek kelengkapan aset & prompt asisten"
	@echo "make agent-sync     : Update characters.json dari variables.csv"
	@echo "make agent-prompt   : Generate prompt Midjourney untuk karakter"
	@echo "make agent-compress : Compress & pindahkan icon ke folder public"
	@echo "--------------------------------------------------------"

agent-status:
	@python3 .agents/manager.py status

agent-sync:
	@python3 .agents/manager.py sync-csv

agent-prompt:
	@python3 .agents/manager.py generate-prompts

agent-compress:
	@python3 .agents/manager.py compress-icons
