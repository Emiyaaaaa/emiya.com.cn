import type { APIRoute } from "astro";
import { getSortedPosts, getPostSlug } from "../lib/posts";

export const prerender = true;

function formatW3CDate(date: Date): string {
	return date.toISOString();
}

export const GET: APIRoute = async ({ site }) => {
	if (!site) {
		throw new Error("Missing `site` in astro.config.mjs");
	}

	const siteUrl = site.origin;
	const posts = await getSortedPosts();

	const postEntries = posts.map((post) => {
		const lastModified = post.data.updatedAt ?? post.data.date;
		return `  <url>
    <loc>${new URL(`/posts/${getPostSlug(post)}`, siteUrl).toString()}</loc>
    <lastmod>${formatW3CDate(lastModified)}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>`;
	});

	const latestPost = posts.reduce<Date>((acc, item) => {
		const t = (item.data.updatedAt ?? item.data.date).getTime();
		return t > acc.getTime() ? (item.data.updatedAt ?? item.data.date) : acc;
	}, new Date(0));

	const lastMod = latestPost.getTime() === 0 ? new Date() : latestPost;

	const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${siteUrl}</loc>
    <lastmod>${formatW3CDate(lastMod)}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1</priority>
  </url>
  <url>
    <loc>${new URL("/posts", siteUrl).toString()}</loc>
    <lastmod>${formatW3CDate(lastMod)}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
${postEntries.join("\n")}
</urlset>`;

	return new Response(xml, {
		headers: {
			"Content-Type": "application/xml; charset=utf-8"
		}
	});
};
