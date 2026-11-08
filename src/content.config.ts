import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const knowledge = defineCollection({
  // Files live in en/ and nl/ under the same filename, which is also the URL slug.
  loader: glob({ pattern: '**/*.mdx', base: './src/content/knowledge' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    track: z.enum(['software', 'product', 'workflow', 'foundations']),
    /** Shows a visible "draft" label on the article. Delete the line once reviewed. */
    draft: z.boolean().default(false),
  }),
});

export const collections = { knowledge };
