import { pgTable, serial, text, timestamp, integer, varchar } from 'drizzle-orm/pg-core';

/**
 * 1. Users Table (Core Identity)
 * Populated automatically via Google OAuth or Email Sign-in.
 */
export const users = pgTable('users', {
  id: text('id').primaryKey(), // Google Sub ID or generated unique ID
  email: text('email').notNull().unique(),
  name: text('name').notNull(),
  image: text('image'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

/**
 * 2. Sessions Table (Stateful Cookie Verification)
 * Standard token stored in secure httpOnly cookie.
 */
export const sessions = pgTable('sessions', {
  id: text('id').primaryKey(), // Random cryptographically secure token
  userId: text('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  expiresAt: timestamp('expires_at').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

/**
 * 3. Entitlements Table (Rock-Solid Pure String Grants)
 * Stores unlocked packages/resources: e.g. "bundle-all-access", "course/ai-for-beginners"
 */
export const entitlements = pgTable('entitlements', {
  id: serial('id').primaryKey(),
  userId: text('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  grant: text('grant').notNull(), // Exact slug or resource path prefix
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

/**
 * 4. Orders Table (Transactional Ledger for Midtrans)
 */
export const orders = pgTable('orders', {
  id: text('id').primaryKey(), // Midtrans order_id, e.g. "ORD-1730000000000"
  userId: text('user_id').references(() => users.id, { onDelete: 'set null' }),
  productSlug: varchar('product_slug', { length: 255 }).notNull(),
  amount: integer('amount').notNull(), // IDR
  status: varchar('status', { length: 50 }).default('pending').notNull(), // pending, settlement, cancel, expire
  snapToken: text('snap_token'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type Session = typeof sessions.$inferSelect;
export type Entitlement = typeof entitlements.$inferSelect;
export type Order = typeof orders.$inferSelect;
