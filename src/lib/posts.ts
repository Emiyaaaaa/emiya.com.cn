import { getCollection, type CollectionEntry } from "astro:content";

export type PostEntry = CollectionEntry<"posts">;

export function getPostExcerpt(content: string, maxLength = 140): string {
	const stripped = content
		.replace(/```[\s\S]*?```/g, " ")
		.replace(/`[^`]*`/g, " ")
		.replace(/^#+\s.*$/gm, " ")
		.replace(/!\[[^\]]*]\([^)]*\)/g, " ")
		.replace(/\[([^\]]+)]\([^)]*\)/g, "$1")
		.replace(/<[^>]+>/g, " ")
		.replace(/[*_~>]/g, " ")
		.replace(/\s+/g, " ")
		.trim();

	if (stripped.length <= maxLength) return stripped;

	return `${stripped.slice(0, maxLength).trim()}…`;
}

export async function getSortedPosts(): Promise<PostEntry[]> {
	const posts = await getCollection("posts");
	return posts.sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
}

export function getPostSlug(entry: PostEntry): string {
	return entry.id.replace(/\.mdx$/, "");
}

export function getPostUrl(entry: PostEntry): string {
	const site = import.meta.env.SITE;

	if (!site) {
		throw new Error("Missing `site` in astro.config.mjs");
	}

	return new URL(`/posts/${getPostSlug(entry)}`, site).toString();
}

export function formatPostDate(date: Date): string {
	const year = date.getFullYear();
	const month = date.toLocaleString("en-US", { month: "long" });
	const day = date.getDate();
	return `${month} ${day} · ${year}`;
}

export function toISO(date?: Date): string | undefined {
	if (!date) return undefined;
	if (Number.isNaN(date.getTime())) return undefined;
	return date.toISOString();
}
