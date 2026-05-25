import Header from "@/components/Content/Header";
import { Code } from "@/ui/Code";
import { Devider } from "@/ui/Devider";
import Time from "@/ui/Time";
import { MDXRemote } from "next-mdx-remote/rsc";
import Link from "next/link";
import { notFound } from "next/navigation";
import React from "react";
import { SITE_AUTHOR, SITE_URL } from "../../seo";
import { getMDX, getPostExcerpt, metadataes } from "../utils";

export async function generateStaticParams() {
	return metadataes.map((m) => ({
		title: m?.path
	}));
}

export default async function MdxPage({
	params
}: { params: Promise<{ title: string }> }) {
	const { title } = await params;
	const slug = decodeURIComponent(title);
	const mdx = getMDX(slug);

	if (!mdx) return notFound();

	const { metadata, content } = mdx;

	if (!metadata) return notFound();

	const description =
		metadata.description?.trim() || getPostExcerpt(content, 140);

	const publishedTime = metadata.date
		? new Date(metadata.date).toISOString()
		: undefined;
	const modifiedTime = metadata.updatedAt
		? new Date(metadata.updatedAt).toISOString()
		: publishedTime;

	const canonicalUrl = `${SITE_URL}/blog/${slug}`;

	const articleJsonLd = {
		"@context": "https://schema.org",
		"@type": "BlogPosting",
		headline: metadata.title,
		description,
		datePublished: publishedTime,
		dateModified: modifiedTime,
		inLanguage: "zh-CN",
		keywords: metadata.tags?.join(", "),
		mainEntityOfPage: {
			"@type": "WebPage",
			"@id": canonicalUrl
		},
		url: canonicalUrl,
		author: {
			"@type": "Person",
			name: SITE_AUTHOR.name,
			url: SITE_URL
		},
		publisher: {
			"@type": "Person",
			name: SITE_AUTHOR.name,
			url: SITE_URL
		}
	};

	const relatedPosts = (() => {
		const currentTags = new Set(metadata.tags?.map((t) => t.toLowerCase()));
		if (currentTags.size === 0) return [] as typeof metadataes;
		return metadataes
			.filter(
				(m) =>
					m?.path !== slug &&
					m?.tags?.some((t) => currentTags.has(t.toLowerCase()))
			)
			.slice(0, 4);
	})();

	const breadcrumbJsonLd = {
		"@context": "https://schema.org",
		"@type": "BreadcrumbList",
		itemListElement: [
			{
				"@type": "ListItem",
				position: 1,
				name: "首页",
				item: SITE_URL
			},
			{
				"@type": "ListItem",
				position: 2,
				name: "博客",
				item: `${SITE_URL}/blog`
			},
			{
				"@type": "ListItem",
				position: 3,
				name: metadata.title,
				item: canonicalUrl
			}
		]
	};

	return (
		<>
			<script
				type="application/ld+json"
				// biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD payload is server-rendered and safe
				dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
			/>
			<script
				type="application/ld+json"
				// biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD payload is server-rendered and safe
				dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
			/>
			<article className="post">
				<header className="m-1 w-full">
					<h1 className="m-0 text-3xl font-bold leading-snug">
						<span>{metadata.title}</span>
					</h1>
					<div className="ml-1 mt-4 flex flex-wrap items-center gap-x-3 gap-y-1 opacity-70">
						{metadata.date && (
							<Time
								format="MON DD · YYYY"
								date={new Date(metadata.date)}
							/>
						)}
					</div>
					{metadata.tags && metadata.tags.length > 0 && (
						<div className="mt-3 flex flex-wrap gap-2" aria-label="标签">
							{metadata.tags.filter(Boolean).map((tag) => (
								<span
									key={tag}
									className="tag"
									data-tag={tag.toLowerCase()}
								>
									{tag}
								</span>
							))}
						</div>
					)}
				</header>
				<Devider className="my-4" />
				<div className="markdown w-fill mt-4 flex flex-col px-[2%] py-2">
					<MDXRemote
						source={content}
						components={{
							h1: ({ children }) => {
								return <Header level={1} text={children as string} withHash />;
							},
							h2: ({ children }) => {
								return <Header level={2} text={children as string} withHash />;
							},
							h3: ({ children }) => {
								return <Header level={3} text={children as string} withHash />;
							},
							h4: ({ children }) => {
								return <Header level={4} text={children as string} withHash />;
							},
							h5: ({ children }) => {
								return <Header level={5} text={children as string} withHash />;
							},
							h6: ({ children }) => {
								return <Header level={6} text={children as string} withHash />;
							},
							pre: (props: any) => {
								return (
									<Code
										code={props.children.props.children}
										language={props.children.props.className?.split("-")?.[1]}
									/>
								);
							},
							a: ({
								href,
								children,
								...rest
							}: React.AnchorHTMLAttributes<HTMLAnchorElement>) => {
								const isExternal =
									typeof href === "string" && /^https?:\/\//.test(href);
								return (
									<a
										href={href}
										{...rest}
										{...(isExternal
											? { target: "_blank", rel: "noopener noreferrer" }
											: {})}
									>
										{children}
									</a>
								);
							}
						}}
					/>
				</div>
				{relatedPosts.length > 0 && (
					<aside className="mt-10 border-t border-color-font/10 pt-6">
						<h2 className="text-lg font-bold">相关文章</h2>
						<ul className="mt-3 space-y-2 list-disc pl-5">
							{relatedPosts.map((p) => (
								<li key={p?.path}>
									<Link
										href={`/blog/${p?.path}`}
										className="opacity-80 hover:opacity-100"
									>
										{p?.title}
									</Link>
								</li>
							))}
						</ul>
					</aside>
				)}
				<footer className="mt-10 text-sm opacity-60">
					转载请注明出处：
					<a href={canonicalUrl}>{canonicalUrl}</a> · 作者 {SITE_AUTHOR.name}
				</footer>
			</article>
		</>
	);
}
