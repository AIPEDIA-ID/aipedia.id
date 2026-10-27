import type { Resource, PublicResource } from "./data/types";

const PAID_KEYS = new Set<keyof Resource>([
  "prompt_preview",
  "steps",
  "tips",
  "body",
  "modules",
]);

export function toPublicView(resource: Resource): PublicResource {
  const view: PublicResource = {
    id: resource.id,
    title: resource.title,
    description: resource.description,
    category: resource.category,
    access_level: resource.access_level,
    teaser: resource.teaser,
    tools: resource.tools,
    topics: resource.topics,
    thumbnail: resource.thumbnail,
    moduleCount: resource.modules?.length,
  };

  return view;
}

export function hasNoPaidKeys(resource: Resource): boolean {
  for (const key of Object.keys(resource) as (keyof Resource)[]) {
    if (PAID_KEYS.has(key) && resource[key] !== undefined) {
      return false;
    }
  }
  return true;
}
