import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

function getSafeDirname(): string {
  try {
    if (typeof import.meta !== 'undefined' && typeof import.meta.url === 'string' && import.meta.url) {
      return path.dirname(fileURLToPath(import.meta.url));
    }
  } catch {
    // ignore
  }
  try {
    if (typeof process !== 'undefined' && typeof process.cwd === 'function') {
      return process.cwd();
    }
  } catch {
    // ignore
  }
  return '';
}

const __dirname = getSafeDirname();

export interface ResourceItem {
  id: string; // Universal ID: e.g. 'course/ai-for-beginners', 'prompts/llm-prompt/seo-article-master'
  filePath: string;
  data: Record<string, any>;
  content: string;
}

export interface CatalogProduct {
  slug?: string;
  title: string;
  description: string;
  price: number;
  currency: string;
  includes: string[];
  thumbnail?: string;
  badge?: string;
  visibility?: 'public' | 'private';
}

export interface CatalogBundle {
  slug?: string;
  title: string;
  description: string;
  price: number;
  currency: string;
  includes: string[];
  thumbnail?: string;
}

export interface CatalogData {
  products: CatalogProduct[];
  bundles: CatalogBundle[];
}

/**
 * Lightweight, zero-dependency YAML frontmatter parser
 */
function parseFrontmatter(raw: string): { data: Record<string, any>; content: string } {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (!match) {
    return { data: {}, content: raw.trim() };
  }

  const rawYaml = match[1];
  const content = match[2].trim();
  const data: Record<string, any> = {};

  const lines = rawYaml.split(/\r?\n/);
  let currentKey = '';
  let inArray = false;
  let inModules = false;
  let currentModule: any = null;

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;

    // Detect array item under modules
    if (inModules && line.startsWith('  - ')) {
      currentModule = {};
      if (!data.modules) data.modules = [];
      data.modules.push(currentModule);
      const sub = trimmed.replace(/^- /, '');
      const colonIdx = sub.indexOf(':');
      if (colonIdx !== -1) {
        const k = sub.slice(0, colonIdx).trim();
        const v = sub.slice(colonIdx + 1).trim().replace(/^['"]|['"]$/g, '');
        currentModule[k] = v;
      }
      continue;
    }

    if (inModules && currentModule && (line.startsWith('    ') || line.startsWith('\t\t'))) {
      const colonIdx = trimmed.indexOf(':');
      if (colonIdx !== -1) {
        const k = trimmed.slice(0, colonIdx).trim();
        let v: any = trimmed.slice(colonIdx + 1).trim().replace(/^['"]|['"]$/g, '');
        if (/^\d+$/.test(v)) v = parseInt(v, 10);
        currentModule[k] = v;
      }
      continue;
    }

    // Standard list item
    if (trimmed.startsWith('- ')) {
      const val = trimmed.slice(2).trim().replace(/^['"]|['"]$/g, '');
      if (inArray && currentKey) {
        if (!Array.isArray(data[currentKey])) data[currentKey] = [];
        data[currentKey].push(val);
      }
      continue;
    }

    // Key-value pair
    const colonIdx = trimmed.indexOf(':');
    if (colonIdx !== -1) {
      const key = trimmed.slice(0, colonIdx).trim();
      let value = trimmed.slice(colonIdx + 1).trim();

      if (key === 'modules') {
        inModules = true;
        inArray = false;
        currentKey = 'modules';
        continue;
      }

      inModules = false;

      if (!value) {
        inArray = true;
        currentKey = key;
        data[key] = [];
        continue;
      }

      // Inline array: [A, B]
      if (value.startsWith('[') && value.endsWith(']')) {
        data[key] = value
          .slice(1, -1)
          .split(',')
          .map((s) => s.trim().replace(/^['"]|['"]$/g, ''))
          .filter(Boolean);
        inArray = false;
        continue;
      }

      // Stripping quotes
      value = value.replace(/^['"]|['"]$/g, '');
      if (/^\d+$/.test(value)) {
        data[key] = parseInt(value, 10);
      } else if (value === 'true') {
        data[key] = true;
      } else if (value === 'false') {
        data[key] = false;
      } else {
        data[key] = value;
      }
      inArray = false;
      currentKey = key;
    }
  }

  return { data, content };
}

/**
 * Universal Zero-Dependency Reader for any Node.js, Next.js, Express, or Remix project.
 * Recursively walks the directory and returns all resources with universal IDs.
 */
export function getAllResources(baseDir?: string): ResourceItem[] {
  const root = baseDir || __dirname;
  if (!root || typeof fs === 'undefined' || !fs.existsSync || !fs.existsSync(root)) return [];
  const items: ResourceItem[] = [];

  function walk(dir: string) {
    if (!fs.existsSync(dir)) return;
    const entries = fs.readdirSync(dir);
    for (const entry of entries) {
      const fullPath = path.join(dir, entry);
      const stat = fs.statSync(fullPath);

      if (stat.isDirectory()) {
        walk(fullPath);
      } else if (entry.endsWith('.md') && entry.toLowerCase() !== 'readme.md') {
        const raw = fs.readFileSync(fullPath, 'utf-8');
        const { data, content } = parseFrontmatter(raw);

        const relPath = path.relative(root, fullPath).replace(/\\/g, '/');
        const id = relPath.replace(/\.md$/, '');

        items.push({
          id,
          filePath: fullPath,
          data,
          content,
        });
      }
    }
  }

  walk(root);
  return items;
}

/**
 * Get single resource by its universal ID (e.g. 'course/ai-for-beginners')
 */
export function getResourceById(id: string, baseDir?: string): ResourceItem | null {
  const root = baseDir || __dirname;
  if (!root || typeof fs === 'undefined' || !fs.existsSync) return null;
  const fullPath = path.join(root, `${id}.md`);
  if (!fs.existsSync(fullPath)) return null;

  const raw = fs.readFileSync(fullPath, 'utf-8');
  const { data, content } = parseFrontmatter(raw);

  return {
    id,
    filePath: fullPath,
    data,
    content,
  };
}

/**
 * Parses catalog.yaml without third-party dependencies.
 */
export function getCatalog(baseDir?: string): CatalogData {
  const root = baseDir || __dirname;
  if (!root || typeof fs === 'undefined' || !fs.existsSync) {
    return { products: [], bundles: [] };
  }
  const catalogPath = path.join(root, 'catalog.yaml');
  if (!fs.existsSync(catalogPath)) {
    return { products: [], bundles: [] };
  }

  const raw = fs.readFileSync(catalogPath, 'utf-8');
  const lines = raw.split(/\r?\n/);

  const products: CatalogProduct[] = [];
  const bundles: CatalogBundle[] = [];

  let currentSection: 'products' | 'bundles' | null = null;
  let currentItem: any = null;
  let currentKey = '';
  let inArray = false;

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;

    if (trimmed === 'products:') {
      currentSection = 'products';
      currentItem = null;
      continue;
    } else if (trimmed === 'bundles:') {
      currentSection = 'bundles';
      currentItem = null;
      continue;
    }

    // An item start is a list item indented directly under the section (e.g., '  - ')
    if ((line.startsWith('  - ') || (line.startsWith('- ') && !line.startsWith('    '))) && currentSection) {
      currentItem = {};
      if (currentSection === 'products') products.push(currentItem);
      if (currentSection === 'bundles') bundles.push(currentItem);

      const sub = trimmed.slice(2).trim();
      const cIdx = sub.indexOf(':');
      if (cIdx !== -1) {
        const k = sub.slice(0, cIdx).trim();
        let v: any = sub.slice(cIdx + 1).trim().replace(/^['"]|['"]$/g, '');
        if (/^\d+$/.test(v)) v = parseInt(v, 10);
        currentItem[k] = v;
      }
      inArray = false;
      continue;
    }

    if (currentItem && (line.startsWith('    ') || line.startsWith('\t\t') || line.startsWith('  '))) {
      if (trimmed.startsWith('- ')) {
        const val = trimmed.slice(2).trim().replace(/^['"]|['"]$/g, '');
        if (inArray && currentKey) {
          if (!Array.isArray(currentItem[currentKey])) currentItem[currentKey] = [];
          currentItem[currentKey].push(val);
        }
        continue;
      }

      const cIdx = trimmed.indexOf(':');
      if (cIdx !== -1) {
        const k = trimmed.slice(0, cIdx).trim();
        let v: any = trimmed.slice(cIdx + 1).trim();

        if (!v) {
          inArray = true;
          currentKey = k;
          currentItem[k] = [];
          continue;
        }

        v = v.replace(/^['"]|['"]$/g, '');
        if (/^\d+$/.test(v)) v = parseInt(v, 10);
        currentItem[k] = v;
        inArray = false;
      }
    }
  }

  return { products, bundles };
}

/**
 * Universal Entitlement Access Checker:
 * Given a target resource ID and a list of entitlement strings granted to a user,
 * returns true if access is granted.
 */
export function checkEntitlementAccess(
  targetResourceId: string,
  userEntitlements: string[]
): boolean {
  if (userEntitlements.includes(targetResourceId)) return true;

  for (const ent of userEntitlements) {
    if (targetResourceId.startsWith(ent + '/') || targetResourceId === ent) {
      return true;
    }
  }

  return false;
}
