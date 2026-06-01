import type { APIRoute } from "astro";
import {
	getPostExcerpt,
	getSortedPosts,
	getPostUrl
} from "../lib/posts";
import { SITE_AUTHOR, SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "../consts";

export const prerender = true;

function escapeXml(value: string) {
	return value.replace(/[<>&'"]/g, (c) => {
		switch (c) {
			case "<":
				return "&lt;";
			case ">":
				return "&gt;";
			case "&":
				return "&amp;";
			case "'":
				return "&apos;";
			case '"':
				return "&quot;";
			default:
				return c;
		}
	});
}

function toRfc822(input?: Date): string {
	const d = input ?? new Date();
	if (Number.isNaN(d.getTime())) return new Date().toUTCString();
	return d.toUTCString();
}

export const GET: APIRoute = async () => {
	const metadataes = await getSortedPosts();

	const latest = metadataes
		.slice(0, 30)
		.map((post) => {
			const description =
				post.data.description?.trim() ||
				getPostExcerpt(post.body ?? "", 200);
			const link = getPostUrl(post);
			const pubDate = toRfc822(post.data.date);
			const updated = toRfc822(post.data.updatedAt ?? post.data.date);
			const categories =
				post.data.tags
					?.filter(Boolean)
					.map((tag) => `      <category>${escapeXml(tag)}</category>`)
					.join("\n") ?? "";

			return `    <item>
      <title>${escapeXml(post.data.title ?? "Untitled")}</title>
      <link>${escapeXml(link)}</link>
      <guid isPermaLink="true">${escapeXml(link)}</guid>
      <description>${escapeXml(description)}</description>
      <pubDate>${pubDate}</pubDate>
      <atom:updated>${new Date(updated).toISOString()}</atom:updated>
      <author>noreply@emiya.com.cn (${escapeXml(SITE_AUTHOR.name)})</author>
${categories}
    </item>`;
		})
		.join("\n");

	const lastBuildDate = toRfc822(
		metadataes[0]?.data.updatedAt ?? metadataes[0]?.data.date
	);

	const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0"
  xmlns:atom="http://www.w3.org/2005/Atom"
  xmlns:content="http://purl.org/rss/1.0/modules/content/"
  xmlns:dc="http://purl.org/dc/elements/1.1/">
  <channel>
    <title>${escapeXml(SITE_NAME)}</title>
    <link>${SITE_URL}</link>
    <description>${escapeXml(SITE_DESCRIPTION)}</description>
    <language>zh-CN</language>
    <copyright>© ${new Date().getFullYear()} ${escapeXml(SITE_AUTHOR.name)}</copyright>
    <lastBuildDate>${lastBuildDate}</lastBuildDate>
    <atom:link href="${SITE_URL}/feed.xml" rel="self" type="application/rss+xml" />
${latest}
  </channel>
</rss>`;

	return new Response(xml, {
		headers: {
			"Content-Type": "application/rss+xml; charset=utf-8",
			"Cache-Control": "public, max-age=300, s-maxage=300"
		}
	});
};
