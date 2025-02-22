import { defineCollection, z } from 'astro:content';
import { docsLoader, i18nLoader } from "@astrojs/starlight/loaders";
import { docsSchema, i18nSchema } from '@astrojs/starlight/schema';

export const collections = {
	docs: defineCollection({
		loader: docsLoader(),
		schema: docsSchema({
			extend: z.object({
				origin: z.string().url().optional(),
				giscus: z.boolean().optional().default(true),
			}),
		})
	}),
	i18n: defineCollection({ loader: i18nLoader(), schema: i18nSchema() }),
};
