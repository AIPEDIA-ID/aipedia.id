import type {
  Resource,
  Product,
  Bundle,
  User,
  Order,
} from "./types";
import { resources } from "../../data/resources";
import { products, bundles, mockUser, mockLoggedIn, mockGrants, mockOrders } from "../../data/catalog";

function delay<T>(value: T): Promise<T> {
  return Promise.resolve(value);
}

export function getResources(): Promise<Resource[]> {
  return delay(resources);
}

export function getResourceById(id: string): Promise<Resource | null> {
  return delay(resources.find((r) => r.id === id) ?? null);
}

export function getCatalog(): Promise<{ products: Product[]; bundles: Bundle[] }> {
  return delay({ products, bundles });
}

export function getCurrentUser(): Promise<User | null> {
  return delay(mockLoggedIn ? mockUser : null);
}

export function getGrants(userId: string): Promise<string[]> {
  if (!mockLoggedIn || userId !== mockUser.id) return delay([]);
  return delay(mockGrants);
}

export function getOrders(userId: string): Promise<Order[]> {
  if (!mockLoggedIn || userId !== mockUser.id) return delay([]);
  return delay(mockOrders);
}

export function getOrder(orderId: string): Promise<Order | null> {
  return delay(mockOrders.find((o) => o.id === orderId) ?? null);
}
