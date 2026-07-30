.PHONY: help project-status project-visual-prompt project-compress project-generate-all

help:
	@echo "Aipedia.id Makefile Commands:"
	@echo "--------------------------------------------------------"
	@echo "make project-status        : Cek kelengkapan aset & prompt asisten"
	@echo "make project-generate-all  : Generate & sync semua dokumen (Web, ASISTANT.md, Index)"
	@echo "make project-visual-prompt : Generate visual prompt untuk karakter"
	@echo "make project-compress      : Compress & pindahkan icon ke folder public"
	@echo "--------------------------------------------------------"

status:
	@python3 scripts/manager.py status

generate-all:
	@python3 scripts/manager.py generate-all

visual-prompt:
	@python3 scripts/manager.py generate-visual-prompts

compress:
	@python3 scripts/manager.py compress-icons

build-products:
	@if [ -z "$(CAMPAIGN)" ]; then \
		python3 scripts/builder.py basic; \
		python3 scripts/builder.py pro; \
		python3 scripts/builder.py tira; \
		python3 scripts/builder.py mita; \
	else \
		python3 scripts/builder.py $(CAMPAIGN); \
	fi

