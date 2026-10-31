# ==============================================================================
# AIPEDIA CLI Entrypoint (Makefile)
#
# Rule: Always use this Makefile as the single entrypoint for all project tasks.
# Namespaces:
#   web-*  : Astro web application lifecycle (dev, build, preview)
#   test-* : Vitest test suites (run, watch, file)
#   ops-*  : Product manufacturing, SSOT syncing & asset processing
#   db-*   : Drizzle ORM schema & database management
# ==============================================================================
.DEFAULT_GOAL := help
SHELL := /bin/bash

# ANSI Color Formatting
CYAN   := \033[36m
GREEN  := \033[32m
YELLOW := \033[33m
DIM    := \033[2m
RESET  := \033[0m

##@ 📖 General & Help
.PHONY: help
help: ## Display this command catalog and usage instructions
	@echo -e "$(CYAN)╔══════════════════════════════════════════════════════════════════╗$(RESET)"
	@echo -e "$(CYAN)║                  AIPEDIA CLI ENTRYPOINT MATRIX                   ║$(RESET)"
	@echo -e "$(CYAN)╚══════════════════════════════════════════════════════════════════╝$(RESET)"
	@echo -e "Usage: $(GREEN)make <namespace>-<action>$(RESET)  or  $(GREEN)make <shortcut>$(RESET)\n"
	@awk 'BEGIN {FS = ":.*##"; printf "%-24s %s\n", "Target", "Description"} \
		/^[a-zA-Z0-9_-]+:.*?##/ { printf "  $(GREEN)%-22s$(RESET) %s\n", $$1, $$2 } \
		/^##@/ { printf "\n$(YELLOW)%s$(RESET)\n", substr($$0, 5) }' $(MAKEFILE_LIST)

##@ 🌐 Web Application (web-*)
.PHONY: web-dev web-build web-preview web-clean web-install
web-dev: ## Start local Astro development server on http://localhost:4321
	yarn dev

web-build: ## Build production application bundle with Cloudflare Worker adapter
	yarn build

web-preview: ## Preview the production build locally
	yarn preview

web-clean: ## Remove build artifacts, Astro cache, and Vite caches
	rm -rf dist .astro node_modules/.vite

web-install: ## Install project dependencies via Yarn
	yarn install

##@ 🧪 Testing Suite (test-*)
.PHONY: test test-run test-watch test-file
test: test-run ## Run all 34 unit tests (default testing shortcut)

test-run: ## Run all unit tests (access, auth, checkout, webhook)
	yarn test

test-watch: ## Run unit tests in interactive watch mode
	yarn vitest

test-file: ## Run a specific test file (e.g. make test-file FILE=test/checkout.test.ts)
	@if [ -z "$(FILE)" ]; then \
		echo -e "$(YELLOW)Error: Please specify FILE=<path>. Example: make test-file FILE=test/checkout.test.ts$(RESET)"; \
		exit 1; \
	fi
	yarn vitest run $(FILE)

##@ ⚙️ Operations & Manufacturing (ops-*)
.PHONY: ops-sync ops-sync-web ops-icons ops-prompts ops-build ops-content
ops-sync: ## Full sync: SSOT assistants.json -> web characters, CustomGPT prompts & guide
	python3 ops/scripts/manager.py generate-all

ops-sync-web: ## Sync only characters.json for Astro web UI
	python3 ops/scripts/manager.py sync-web

ops-icons: ## Compress & optimize raw specialist icons into public/character/
	python3 ops/scripts/manager.py compress-icons

ops-prompts: ## Generate Midjourney / visual AI image prompts for all 17 specialists
	python3 ops/scripts/manager.py generate-visual-prompts

ops-build: ## Compile customer deliverables (PDF guides and packaged ZIPs)
	python3 ops/scripts/builder.py all

ops-content: ## Run automated social media carousel slide and caption generator
	python3 ops/content-generator/generator.py

##@ 🗄️ Database & Drizzle ORM (db-*)
.PHONY: db-generate db-push db-studio
db-generate: ## Generate Drizzle SQL migrations based on db/schema.ts
	npx drizzle-kit generate

db-push: ## Push schema changes directly to PostgreSQL database
	npx drizzle-kit push

db-studio: ## Open local Drizzle Studio web interface for database inspection
	npx drizzle-kit studio

##@ ⚡ Fast Shortcuts (Global Aliases)
.PHONY: dev build sync clean
dev: web-dev ## Shortcut for 'make web-dev'
build: web-build ## Shortcut for 'make web-build'
sync: ops-sync ## Shortcut for 'make ops-sync'
clean: web-clean ## Shortcut for 'make web-clean'
