import { defineCollection, z } from 'astro:content';

const authors = defineCollection({
  type: 'content',
  schema: z.object({
    name: z.string(),
    title: z.string(),
    bio: z.string(),
    avatar: z.string(),
    email: z.string(),
    twitter: z.string().optional(),
    linkedin: z.string().optional(),
    website: z.string().optional(),
    location: z.string(),
    joinDate: z.string(),
    totalPosts: z.number(),
    totalViews: z.string(),
    expertise: z.array(z.string()),
  }),
});

const posts = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    subtitle: z.string(),
    date: z.string(),
    author: z.string(),
    authorSlug: z.string(),
    image: z.string(),
    type: z.string(),
    readTime: z.string(),
    featured: z.boolean().default(false),
    tags: z.array(z.string()).default([]),
  }),
});

export const collections = {
  authors,
  posts,
};