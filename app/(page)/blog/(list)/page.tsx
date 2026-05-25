import Card from "@/components/Card";
import type { Metadata } from "next";
import Link from "next/link";
import React from "react";
import { SITE_AUTHOR, SITE_NAME, SITE_URL } from "../../seo";
import { metadataes } from "../utils";

const BLOG_TITLE = "博客文章";
const BLOG_DESCRIPTION =
	"Emiya 的博客文章列表，涵盖 CSS、JavaScript、TypeScript、React、Git 等前端开发与工程实践的学习笔记与踩坑总结。";

export const metadata: Metadata = {
	title: BLOG_TITLE,
	description: BLOG_DESCRIPTION,
	alternates: {
		canonical: "/blog",
		types: {
			"application/rss+xml": [
				{ url: "/feed.xml", title: `${SITE_NAME} RSS Feed` }
			]
		}
	},
	openGraph: {
		type: "website",
		url: `${SITE_URL}/blog`,
		title: `${BLOG_TITLE} | ${SITE_NAME}`,
		description: BLOG_DESCRIPTION,
		siteName: SITE_NAME
	},
	twitter: {
		card: "summary",
		title: `${BLOG_TITLE} | ${SITE_NAME}`,
		description: BLOG_DESCRIPTION
	}
};

export default function ArticleList() {
	const blogJsonLd = {
		"@context": "https://schema.org",
		"@type": "Blog",
		name: `${SITE_NAME} - ${BLOG_TITLE}`,
		url: `${SITE_URL}/blog`,
		description: BLOG_DESCRIPTION,
		inLanguage: "zh-CN",
		author: {
			"@type": "Person",
			name: SITE_AUTHOR.name,
			url: SITE_URL
		},
		blogPost: metadataes.map((m) => ({
			"@type": "BlogPosting",
			headline: m?.title,
			url: m?.uri,
			datePublished: m?.date ? new Date(m.date).toISOString() : undefined,
			dateModified: m?.updatedAt
				? new Date(m.updatedAt).toISOString()
				: m?.date
					? new Date(m.date).toISOString()
					: undefined,
			description: m?.description
		}))
	};

	return (
		<div>
			<script
				type="application/ld+json"
				// biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD payload is server-rendered and safe
				dangerouslySetInnerHTML={{ __html: JSON.stringify(blogJsonLd) }}
			/>
			<h1 className="sr-only">{BLOG_TITLE}</h1>
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
