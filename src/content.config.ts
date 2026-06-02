import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const posts = defineCollection({
	loader: glob({ pattern: "**/*.mdx", base: "./src/content/posts" }),
	schema: z.object({
		title: z.string(),
		date: z.coerce.date(),
		description: z.string().optional(),
		createdAt: z.coerce.date().optional(),
		updatedAt: z.coerce.date().optional()
	})
});

export const collections = { posts };
