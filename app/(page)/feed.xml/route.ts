import { NextResponse } from "next/server";
import { getMDX, getPostExcerpt, metadataes } from "../blog/utils";
import {
	SITE_AUTHOR,
	SITE_DESCRIPTION,
	SITE_NAME,
	SITE_URL
} from "../seo";

export const dynamic = "force-static";
export const revalidate = 300;

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

function toRfc822(input?: string): string {
	const d = input ? new Date(input) : new Date();
	if (Number.isNaN(d.getTime())) return new Date().toUTCString();
	return d.toUTCString();
}

export async function GET() {
	const latest = metadataes
		.slice(0, 30)
		.map((post) => {
			const description =
				post.description?.trim() ||
				getPostExcerpt(getMDX(post.path)?.content ?? "", 200);
			const link = post.uri;
			const pubDate = toRfc822(post.date);
			const updated = toRfc822(post.updatedAt ?? post.date);
			const categories =
				post.tags
					?.filter(Boolean)
					.map(
						(tag) =>
							`      <category>${escapeXml(tag)}</category>`
					)
					.join("\n") ?? "";

			return `    <item>
      <title>${escapeXml(post.title ?? "Untitled")}</title>
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
		metadataes[0]?.updatedAt ?? metadataes[0]?.date
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

	return new NextResponse(xml, {
		headers: {
			"Content-Type": "application/rss+xml; charset=utf-8",
			"Cache-Control": "public, max-age=300, s-maxage=300"
		}
	});
}
