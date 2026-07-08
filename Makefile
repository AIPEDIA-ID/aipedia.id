.PHONY: help project-status project-sync project-prompt project-compress

help:
	@echo "Aipedia.id Makefile Commands:"
	@echo "--------------------------------------------------------"
	@echo "make project-status   : Cek kelengkapan aset & prompt asisten"
	@echo "make project-sync     : Update characters.json dari variables.csv"
	@echo "make project-prompt   : Generate prompt Midjourney untuk karakter"
	@echo "make project-compress : Compress & pindahkan icon ke folder public"
	@echo "--------------------------------------------------------"

project-status:
	@python3 projects/scripts/manager.py status

project-sync:
	@python3 projects/scripts/manager.py sync-csv

project-prompt:
	@python3 projects/scripts/manager.py generate-prompts

project-compress:
	@python3 projects/scripts/manager.py compress-icons
