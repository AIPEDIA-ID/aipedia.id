import type { Resource } from "./data/types";

export function pathCovers(grant: string, resourceId: string): boolean {
  const normalizedGrant = grant.endsWith("/") ? grant.slice(0, -1) : grant;
  return resourceId === normalizedGrant || resourceId.startsWith(normalizedGrant + "/");
}

export function canAccess(
  resource: { id: string; access_level: "free" | "paid" },
  grants: string[],
): boolean {
  if (resource.access_level === "free") return true;
  return grants.some((g) => pathCovers(g, resource.id));
}
