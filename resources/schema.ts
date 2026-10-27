import { z, defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';

/**
 * Portable Zod Schemas for Git-Native Knowledge Commerce.
 * Can be imported directly into Astro, or extracted for Next.js, Nuxt, Remix, or Express.
 */

export const ToolEnum = z.enum([
  'ChatGPT',
  'Claude',
  'Gemini',
  'Perplexity',
  'Nano Banana',
  'Generic'
]);

export const TopicEnum = z.enum([
  'Marketing & Content',
  'Business & Operations',
  'Productivity & Admin',
  'Career & CV',
  'Education / Learning',
  'Copywriting & Communication',
  'Customer Support',
  'Sales & Closing'
]);

export const AccessLevelEnum = z.enum(['free', 'starter', 'pro']);
export const DeliveryTypeEnum = z.enum(['text', 'link', 'file']);

// Standard knowledge asset schema
export const standardResourceSchema = z.object({
  category: z.enum([
    'llm-prompt',
    'visual-prompt',
    'custom-ai',
    'resource',
    'tutorial',
    'founder-space'
  ]),
  title: z.string(),
  description: z.string(),
  tools: z.array(ToolEnum).optional().default([]),
  topics: z.array(TopicEnum).optional().default([]),
  delivery_type: DeliveryTypeEnum,
  access_level: AccessLevelEnum,
  thumbnail: z.string().optional(),
  url: z.string().optional(),
  file: z.string().optional(),
  uses: z.number().optional().default(0),
  author: z.string().optional(),
  prompt_preview: z.string().optional(),
  steps: z.array(z.string()).optional().default([]),
  tips: z.array(z.string()).optional().default([])
});

// Structured course schema
export const courseModuleSchema = z.object({
  title: z.string(),
  video_url: z.string().optional(),
  notes: z.string().optional(),
  sequence: z.number()
});

export const courseResourceSchema = z.object({
  category: z.literal('course'),
  title: z.string(),
  description: z.string(),
  tools: z.array(ToolEnum).optional().default([]),
  topics: z.array(TopicEnum).optional().default([]),
  access_level: AccessLevelEnum,
  thumbnail: z.string().optional(),
  modules: z.array(courseModuleSchema).optional().default([])
});

export const resourceDiscriminatedSchema = z.discriminatedUnion('category', [
  standardResourceSchema,
  courseResourceSchema
]);

export const catalogProductSchema = z.object({
  slug: z.string().optional(),
  title: z.string(),
  description: z.string(),
  price: z.number(),
  originalPrice: z.number().optional(),
  currency: z.string().default('IDR'),
  includes: z.array(z.string()),
  thumbnail: z.string().optional(),
  badge: z.string().optional(),
  features: z.array(z.string()).optional().default([]),
  visibility: z.enum(['public', 'private']).default('public')
});

export const catalogBundleSchema = z.object({
  slug: z.string().optional(),
  title: z.string(),
  description: z.string(),
  price: z.number(),
  originalPrice: z.number().optional(),
  currency: z.string().default('IDR'),
  includes: z.array(z.string()),
  thumbnail: z.string().optional(),
  badge: z.string().optional(),
  features: z.array(z.string()).optional().default([])
});

export const catalogSchema = z.object({
  products: z.array(catalogProductSchema).optional().default([]),
  bundles: z.array(catalogBundleSchema).optional().default([])
});

/**
 * Astro Collections definition loader
 */
export const resourcesCollection = defineCollection({
  loader: glob({ pattern: ['**/*.md', '!**/README.md'], base: './resources' }),
  schema: resourceDiscriminatedSchema
});

export const catalogCollection = defineCollection({
  loader: glob({ pattern: 'catalog.yaml', base: './resources' }),
  schema: catalogSchema
});

export const collections = {
  resources: resourcesCollection,
  catalog: catalogCollection,
};
