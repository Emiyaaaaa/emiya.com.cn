import fs from "node:fs";
import path from "node:path";

export function getMDX(title: string) {
	const filepath = path.join(
		process.cwd(),
		"app",
		"(page)",
		"blog",
		"posts",
		`${title}.mdx`
	);

	return getMDXFromPath(filepath);
}

export function getMDXFromPath(filepath: string) {
	const file = fs.readFileSync(filepath, "utf-8");
	const match = file.match(/---\n([\s\S]+?)\n---\n([\s\S]+)/);

	if (!match) return;

	const metadataString = match[1];
	const content = match[2];

	if (!metadataString) return;
	if (!content) return;

	const title = metadataString.match(/title: (.+)/)?.[1];
	const date = metadataString.match(/date: (.+)/)?.[1];
	const tags = metadataString.match(/(tag|tags): (.+)/)?.[2];
	const description = metadataString.match(/description: (.+)/)?.[1];
	const createdAt = metadataString.match(/createdAt: (.+)/)?.[1];
	const updatedAt = metadataString.match(/updatedAt: (.+)/)?.[1];

	return {
		metadata: {
			title,
			date,
			tags: tags?.split(",").map((tag) => tag.trim()),
			description,
			createdAt,
			updatedAt
		},
		content
	};
}
