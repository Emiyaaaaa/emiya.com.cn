import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
	SITE_AUTHOR,
	SITE_NAME,
	SITE_OG_IMAGE,
	SITE_URL
} from "../../seo";
import { getMDX, getPostExcerpt } from "../utils";

interface Props {
	children: React.ReactNode;
	params: Promise<{
		title: string;
	}>;
}

function toISO(date?: string) {
	if (!date) return undefined;
	const d = new Date(date);
	if (Number.isNaN(d.getTime())) return undefined;
	return d.toISOString();
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const { title: titleParam } = await params;
	const slug = decodeURIComponent(titleParam);
	const mdx = getMDX(slug);

	if (!mdx?.metadata) {
		return {
			title: "文章未找到",
			robots: { index: false, follow: false }
		};
	}

	const { title, description, date, updatedAt, tags } = mdx.metadata;

	const finalDescription =
		description?.trim() || getPostExcerpt(mdx.content, 140);

	const canonical = `/blog/${slug}`;
	const publishedTime = toISO(date);
	const modifiedTime = toISO(updatedAt) ?? publishedTime;

	return {
		title: title,
		description: finalDescription,
		applicationName: SITE_NAME,
		authors: [{ name: SITE_AUTHOR.name, url: SITE_URL }],
		keywords: tags && tags.length > 0 ? tags : undefined,
		alternates: {
			canonical
		},
		openGraph: {
			type: "article",
			url: `${SITE_URL}${canonical}`,
			title: title,
			description: finalDescription,
			siteName: SITE_NAME,
			locale: "zh_CN",
			publishedTime,
			modifiedTime,
			authors: [SITE_URL],
			tags,
			images: [
				{
					url: SITE_OG_IMAGE,
					width: 512,
					height: 512,
					alt: title ?? SITE_NAME
				}
			]
		},
		twitter: {
			card: "summary",
			title: title,
			description: finalDescription,
			creator: SITE_AUTHOR.twitter
		}
	};
}

function Layout({ children }: Props) {
	return <>{children}</>;
}

export default Layout;
