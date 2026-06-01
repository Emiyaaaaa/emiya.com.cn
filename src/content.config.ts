import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const blog = defineCollection({
	loader: glob({ pattern: "**/*.mdx", base: "./src/content/blog" }),
	schema: z.object({
		title: z.string(),
		date: z.coerce.date(),
		tags: z
			.union([z.string(), z.array(z.string())])
			.optional()
			.transform((t) =>
				Array.isArray(t)
					? t
					: t
						? t
								.split(",")
								.map((s) => s.trim())
								.filter(Boolean)
						: undefined
			),
		description: z.string().optional(),
		createdAt: z.coerce.date().optional(),
		updatedAt: z.coerce.date().optional()
	})
});

export const collections = { blog };
