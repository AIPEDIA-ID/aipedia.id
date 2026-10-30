# AIPEDIA Codex Plugin

This local marketplace contains the `aipedia-specialists` Codex plugin. The build process copies the current `products/skills/` directory into the plugin, so it always ships the AIPEDIA router and all specialists with their references and helper scripts.

## Manual installation

From the root of this folder (the directory containing the `.agents` folder), run:

```bash
codex plugin marketplace add /absolute/path/to/codex-plugin-marketplace
codex plugin add aipedia-specialists@aipedia
```

Open a new Codex task after installing or reinstalling the plugin. The `marketplace.json` source path is relative, so keep its adjacent `plugins/aipedia-specialists/` directory intact.
