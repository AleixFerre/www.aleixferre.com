import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const projects = defineCollection({
  loader: glob({ pattern: '*.yaml', base: './src/content/projects' }),
  schema: ({ image }) =>
    z.object({
      order: z.number().int(),
      name: z.string(),
      description: z.string(),
      url: z.url(),
      report: z.object({ href: z.string(), label: z.string() }).optional(),
      highlight: z.boolean().default(false),
      logo: image(),
      background: image(),
      screenshots: z.array(image()),
      keepOriginalScreenshots: z.boolean().default(false),
      details: z.record(z.string(), z.string()),
      goodForYouIf: z.array(z.string()).optional(),
      whatILearned: z.array(z.string()).optional(),
      startedAt: z.coerce.date(),
      finishedAt: z.coerce.date().optional(),
    }),
});

export const collections = { projects };
