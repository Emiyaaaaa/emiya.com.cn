import ThemeSwitch from "@/components/ThemeSwitch";
import "@/tailwind.theme.css";
import { Devider } from "@/ui/Devider";
import { IconArticle, IconGithub, IconHome } from "@/ui/icon";
import { Analytics } from "@vercel/analytics/react";
import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import Link from "next/link";
import type React from "react";
import { Providers } from "./Providers";
import "./layout.scss";
import "./loading.scss";
import "./markdown.scss";
import {
	SITE_AUTHOR,
	SITE_DESCRIPTION,
	SITE_KEYWORDS,
	SITE_LOCALE,
	SITE_NAME,
	SITE_OG_IMAGE,
	SITE_TITLE_DEFAULT,
	SITE_TITLE_TEMPLATE,
	SITE_URL
} from "./seo";
import "./tag.scss";

const inter = Inter({
	subsets: ["latin"],
	display: "swap"
});

export const metadata: Metadata = {
	metadataBase: new URL(SITE_URL),
	title: {
		default: SITE_TITLE_DEFAULT,
		template: SITE_TITLE_TEMPLATE
	},
	description: SITE_DESCRIPTION,
	applicationName: SITE_NAME,
	generator: "Next.js",
	keywords: SITE_KEYWORDS,
	authors: [{ name: SITE_AUTHOR.name, url: SITE_AUTHOR.url }],
	creator: SITE_AUTHOR.name,
	publisher: SITE_AUTHOR.name,
	referrer: "origin-when-cross-origin",
	alternates: {
		canonical: "/",
		types: {
			"application/rss+xml": [
				{ url: "/feed.xml", title: `${SITE_NAME} RSS Feed` }
			]
		}
	},
	icons: {
		icon: [
			{ url: "/favicon/favicon.ico" },
			{
				url: "/favicon/favicon-32x32.png",
				sizes: "32x32",
				type: "image/png"
			},
			{
				url: "/favicon/favicon-16x16.png",
				sizes: "16x16",
				type: "image/png"
			}
		],
		apple: [
			{
				url: "/favicon/apple-touch-icon.png",
				sizes: "180x180",
				type: "image/png"
			}
		]
	},
	manifest: "/favicon/site.webmanifest",
	openGraph: {
		type: "website",
		locale: SITE_LOCALE,
		url: SITE_URL,
		siteName: SITE_NAME,
		title: SITE_TITLE_DEFAULT,
		description: SITE_DESCRIPTION,
		images: [
			{
				url: SITE_OG_IMAGE,
				width: 512,
				height: 512,
				alt: SITE_NAME
			}
		]
	},
	twitter: {
		card: "summary",
		title: SITE_TITLE_DEFAULT,
		description: SITE_DESCRIPTION,
		creator: SITE_AUTHOR.twitter,
		images: [SITE_OG_IMAGE]
	},
	robots: {
		index: true,
		follow: true,
		googleBot: {
			index: true,
			follow: true,
			"max-image-preview": "large",
			"max-snippet": -1,
			"max-video-preview": -1
		}
	},
	formatDetection: {
		email: false,
		address: false,
		telephone: false
	},
	category: "technology"
};

export const viewport: Viewport = {
	width: "device-width",
	initialScale: 1,
	themeColor: [
		{ media: "(prefers-color-scheme: light)", color: "#ffffff" },
		{ media: "(prefers-color-scheme: dark)", color: "#0a0a0a" }
	]
};

export default function RootLayout({
	children
}: { children: React.ReactNode }) {
	return (
		<html lang="zh-CN" suppressHydrationWarning={true}>
			<body className={inter.className} suppressHydrationWarning={true}>
				<Providers>
					<div className="flex h-full w-full flex-col">
						<div className="p-5">
							<div className="flex items-center">
								<Link href="/" aria-label="返回首页">
									<div className="pointer-events-none select-none font-black opacity-90">
										{"Emiya's Blog"}
									</div>
								</Link>
								<nav
									className="ml-auto flex items-center space-x-5 opacity-90"
									aria-label="主导航"
								>
									<Link href="/" aria-label="首页">
										<IconHome width={24} />
									</Link>
									<Link href="/blog" aria-label="博客文章列表">
										<IconArticle width={23} />
									</Link>
									<Devider className="h-[20px]" v />
									<Link
										href="https://github.com/Emiyaaaaa"
										target="_blank"
										rel="noopener noreferrer"
										aria-label="访问 Emiya 的 GitHub"
									>
										<IconGithub width={22} />
									</Link>
									<ThemeSwitch width={22} />
								</nav>
							</div>
						</div>
						<main className="flex-1">
							<div className="flex-col items-center h-full w-full">
								<div className="mx-auto min-h-full w-full max-w-[51rem] overflow-auto">
									{children}
								</div>
							</div>
						</main>
					</div>
				</Providers>
				<Analytics />
			</body>
		</html>
	);
}
