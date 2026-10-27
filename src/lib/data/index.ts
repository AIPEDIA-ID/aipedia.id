// Integration seam: pages and components import data functions only from here.
// To switch to real data, replace the mock imports below with server.ts
// and update the implementations. Call sites do not change.

// TODO: real data via lib/data/server.ts

export {
  getResources,
  getResourceById,
  getCatalog,
  getCurrentUser,
  getGrants,
  getOrders,
  getOrder,
  isMockBypassActive,
} from "./server";

export type {
  Resource,
  PublicResource,
  Product,
  Bundle,
  User,
  Order,
  OrderStatus,
  Category,
  AccessLevel,
  Grant,
} from "./types";
