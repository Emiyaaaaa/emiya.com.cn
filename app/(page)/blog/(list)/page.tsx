import fs from "node:fs";
import Card from "@/components/Card";
import Link from "next/link";
import React from "react";
import { getMDXFromPath } from "../utils";

const posts = fs
	.readdirSync("./app/(page)/blog/posts")
	.filter((p) => p.endsWith(".mdx"))
	.filter(Boolean);

const metadataes = posts
	.map((p) => ({
		...getMDXFromPath(`./app/(page)/blog/posts/${p}`)?.metadata,
		path: p.split(".")[0]
	}))
	.filter(Boolean);

export default function ArticleList() {
	return (
		<div>
			{metadataes.map((metadata, index) => (
				<Link key={index} href={`/blog/${metadata?.path}`}>
					<Card
						title={metadata?.title ?? "unTitled"}
						{...metadata}
						created_at={metadata?.date ? new Date(metadata?.date) : undefined}
					/>
				</Link>
			))}
		</div>
	);
}

export const revalidate = 300;
