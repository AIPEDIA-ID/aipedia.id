import path from "node:path";
import { fileURLToPath } from "node:url";
import type { Resource, Product, Bundle, User, Order } from "./types";
import { getAllResources, getResourceById as getResourceByIdFromEngine, getCatalog as getCatalogFromEngine } from "../../../resources/index.ts";
import { mockUser, mockLoggedIn, mockGrants, mockOrders, products as fallbackProducts, bundles as fallbackBundles } from "../../data/catalog";
import { resources as fallbackResources } from "../../data/resources";

// In Astro static build, Vite bundles modules into virtual chunks where import.meta.url is not in src/lib/data.
// process.cwd() is always the project root during build and dev.
const resourcesDir = path.resolve(process.cwd(), "resources");

function adaptResource(item: { id: string; data: Record<string, any>; content: string }): Resource {
  const d = item.data;
  return {
    id: item.id,
    title: d.title || item.id,
    description: d.description || "",
    category: (d.category as any) || "llm-prompt",
    // Map starter / pro / paid to 'paid', free to 'free'
    access_level: d.access_level === "free" ? "free" : "paid",
    teaser: d.teaser || d.description || "",
    tools: Array.isArray(d.tools) ? d.tools : [],
    topics: Array.isArray(d.topics) ? d.topics : [],
    thumbnail: d.thumbnail,
    prompt_preview: d.prompt_preview,
    steps: Array.isArray(d.steps) ? d.steps : undefined,
    tips: Array.isArray(d.tips) ? d.tips : undefined,
    body: item.content || undefined,
    modules: Array.isArray(d.modules)
      ? d.modules.map((module: Record<string, any>) => ({
          title: String(module.title || ""),
          sequence: Number(module.sequence) || 0,
          video_url: typeof module.video_url === "string" ? module.video_url : undefined,
          notes: typeof module.notes === "string" ? module.notes : undefined,
        }))
      : undefined,
  };
}

export async function getResources(): Promise<Resource[]> {
  try {
    const items = getAllResources(resourcesDir);
    if (!items || !items.length) return fallbackResources;
    return items.map(adaptResource);
  } catch (_e) {
    return fallbackResources;
  }
}

export async function getResourceById(id: string): Promise<Resource | null> {
  try {
    const item = getResourceByIdFromEngine(id, resourcesDir);
    if (!item) return fallbackResources.find((r) => r.id === id) ?? null;
    return adaptResource(item);
  } catch (_e) {
    return fallbackResources.find((r) => r.id === id) ?? null;
  }
}

export async function getCatalog(): Promise<{ products: Product[]; bundles: Bundle[] }> {
  try {
    const catalog = getCatalogFromEngine(resourcesDir);
    const products: Product[] = (catalog.products || []).map((p: any) => ({
      slug: p.slug || "product",
      title: p.title,
      description: p.description,
      price: p.price,
      originalPrice: p.originalPrice || undefined,
      currency: "IDR",
      includes: p.includes || [],
      visibility: "public",
      thumbnail: p.thumbnail,
      badge: p.badge || undefined,
      features: Array.isArray(p.features) ? p.features : undefined,
    }));

    const bundles: Bundle[] = (catalog.bundles || []).map((b: any) => ({
      slug: b.slug || "bundle",
      title: b.title,
      description: b.description,
      price: b.price,
      originalPrice: b.originalPrice || undefined,
      currency: "IDR",
      includes: b.includes || [],
      visibility: "public",
      thumbnail: b.thumbnail,
      badge: b.badge || undefined,
      features: Array.isArray(b.features) ? b.features : undefined,
    }));

    if (!products.length && !bundles.length) {
      return { products: fallbackProducts, bundles: fallbackBundles };
    }
    return { products, bundles };
  } catch (_e) {
    return { products: fallbackProducts, bundles: fallbackBundles };
  }
}

import type { AstroCookies } from "astro";
import { AUTH_CONFIG } from "../../config/auth";
import { validateSession, BYPASS_COOKIE_NAME } from "../auth";

export function isMockBypassActive(cookies?: AstroCookies): boolean {
  const cookieVal = cookies?.get(BYPASS_COOKIE_NAME)?.value;
  if (cookieVal === "true") return true;
  if (cookieVal === "false") return false;
  return AUTH_CONFIG.mockBypass;
}

export async function getCurrentUser(cookies?: AstroCookies): Promise<User | null> {
  // 1. Check if mock bypass is active
  if (isMockBypassActive(cookies)) {
    return mockUser;
  }

  // 2. If cookies available, validate session
  if (cookies) {
    const auth = await validateSession(cookies);
    if (auth.user) {
      return {
        id: auth.user.id,
        name: auth.user.name,
        email: auth.user.email,
      };
    }
  }

  return null;
}

export async function getGrants(userId: string, cookies?: AstroCookies): Promise<string[]> {
  if (isMockBypassActive(cookies)) {
    return mockGrants;
  }

  if (cookies) {
    const auth = await validateSession(cookies);
    if (auth.user && auth.user.id === userId) {
      return auth.grants;
    }
  }

  if (userId === mockUser.id) {
    return mockGrants;
  }

  return [];
}

export async function getOrders(userId: string, cookies?: AstroCookies): Promise<Order[]> {
  if (isMockBypassActive(cookies) || userId === mockUser.id) {
    return mockOrders;
  }
  return [];
}

export async function getOrder(orderId: string): Promise<Order | null> {
  return mockOrders.find((o) => o.id === orderId) ?? null;
}
