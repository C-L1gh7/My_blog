import { defineCollection, z } from 'astro:content';

const posts = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.string(),
    tag: z.string().optional().default('GENERAL'),
    excerpt: z.string().optional(),
    image: z.string().optional(),
  }),
});

const notes = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.string(),
    file: z.string().optional(),
    tags: z.array(z.string()).optional(),
  }),
});

const studies = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    course: z.string(),
    date: z.string(),
    image: z.string().optional(),
  }),
});

export const collections = { posts, notes, studies };
