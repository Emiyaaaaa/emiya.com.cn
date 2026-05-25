import fs from "node:fs";
import path from "node:path";
import { SITE_URL } from "../seo";

export interface PostMetadata {
	title?: string;
	date?: string;
	tags?: string[];
	description?: string;
	createdAt?: string;
	updatedAt?: string;
}

export interface PostEntry extends PostMetadata {
	path: string;
	uri: string;
}

const POSTS_DIR = path.join(process.cwd(), "app", "(page)", "blog", "posts");

function stripQuotes(value: string) {
	return value
		.trim()
		.replace(/^['"](.*)['"]$/, "$1")
		.trim();
}

export function getMDX(title: string) {
	const safeTitle = title.replace(/[/\\]/g, "");
	const filepath = path.join(POSTS_DIR, `${safeTitle}.mdx`);

	if (!fs.existsSync(filepath)) return undefined;

	return getMDXFromPath(filepath);
}

export function getMDXFromPath(filepath: string) {
	if (!fs.existsSync(filepath)) return undefined;

	const file = fs.readFileSync(filepath, "utf-8");
	const match = file.match(/^---\n([\s\S]+?)\n---\n([\s\S]+)/);

	if (!match) {
		return {
			metadata: undefined as PostMetadata | undefined,
			content: file
		};
	}

	const metadataString = match[1];
	const content = match[2];

	if (!metadataString || !content) return undefined;

	const title = metadataString.match(/^title:\s*(.+)$/m)?.[1];
	const date = metadataString.match(/^date:\s*(.+)$/m)?.[1];
	const tagsRaw = metadataString.match(/^(?:tag|tags):\s*(.+)$/m)?.[1];
	const description = metadataString.match(/^description:\s*(.+)$/m)?.[1];
	const createdAt = metadataString.match(/^createdAt:\s*(.+)$/m)?.[1];
	const updatedAt = metadataString.match(/^updatedAt:\s*(.+)$/m)?.[1];

	const metadata: PostMetadata = {
		title: title ? stripQuotes(title) : undefined,
		date: date ? stripQuotes(date) : undefined,
		tags: tagsRaw
			? stripQuotes(tagsRaw)
					.split(",")
					.map((t) => t.trim())
					.filter(Boolean)
			: undefined,
		description: description ? stripQuotes(description) : undefined,
		createdAt: createdAt ? stripQuotes(createdAt) : undefined,
		updatedAt: updatedAt ? stripQuotes(updatedAt) : undefined
	};

	return {
		metadata,
		content
	};
}

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

function readPosts(): PostEntry[] {
	if (!fs.existsSync(POSTS_DIR)) return [];
	const files = fs
		.readdirSync(POSTS_DIR)
		.filter((p) => p.endsWith(".mdx"))
		.filter(Boolean);

	const entries: PostEntry[] = [];

	for (const file of files) {
		const filepath = path.join(POSTS_DIR, file);
		const result = getMDXFromPath(filepath);
		if (!result?.metadata) continue;

		const slug = file.replace(/\.mdx$/, "");
		entries.push({
			...result.metadata,
			path: slug,
			uri: `${SITE_URL}/blog/${slug}`
		});
	}

	return entries.sort((a, b) => {
		const ad = a.date ? new Date(a.date).getTime() : 0;
		const bd = b.date ? new Date(b.date).getTime() : 0;
		return bd - ad;
	});
}

export const metadataes: PostEntry[] = readPosts();
