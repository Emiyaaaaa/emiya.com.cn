import type { MetadataRoute } from "next";
import { SITE_URL } from "./seo";
import { metadataes } from "./blog/utils";

function parseDate(input?: string): Date {
	if (!input) return new Date();
	const d = new Date(input);
	if (Number.isNaN(d.getTime())) return new Date();
	return d;
}

export default function sitemap(): MetadataRoute.Sitemap {
	const posts = metadataes.map((post) => ({
		url: post.uri,
		lastModified: parseDate(post.updatedAt ?? post.date),
		changeFrequency: "monthly" as const,
		priority: 0.8
	}));

	const latestPost = posts.reduce<Date>((acc, item) => {
		const t = item.lastModified.getTime();
		return t > acc.getTime() ? item.lastModified : acc;
	}, new Date(0));

	return [
		{
			url: SITE_URL,
			lastModified: latestPost.getTime() === 0 ? new Date() : latestPost,
			changeFrequency: "weekly",
			priority: 1
		},
		{
			url: `${SITE_URL}/blog`,
			lastModified: latestPost.getTime() === 0 ? new Date() : latestPost,
			changeFrequency: "weekly",
			priority: 0.9
		},
		...posts
	];
}
