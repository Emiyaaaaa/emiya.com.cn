import { WakaTime } from "@/components/WakaTime";
import type { Metadata } from "next";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getMDXFromPath } from "../blog/utils";
import {
	SITE_AUTHOR,
	SITE_DESCRIPTION,
	SITE_NAME,
	SITE_URL
} from "../seo";

const HOME_TITLE = "Emiya's Blog | 前端开发者 Emiya 的个人主页";
const HOME_DESCRIPTION =
	"前端开发者 Emiya 的个人主页，type-fest 核心维护者，分享前端开发、工程实践与远程协作经验。";

export const metadata: Metadata = {
	title: { absolute: HOME_TITLE },
	description: HOME_DESCRIPTION,
	alternates: {
		canonical: "/"
	},
	openGraph: {
		type: "profile",
		url: SITE_URL,
		title: HOME_TITLE,
		description: HOME_DESCRIPTION,
		siteName: SITE_NAME,
		firstName: SITE_AUTHOR.name,
		username: SITE_AUTHOR.name
	},
	twitter: {
		card: "summary",
		title: HOME_TITLE,
		description: HOME_DESCRIPTION,
		creator: SITE_AUTHOR.twitter
	}
};

const personJsonLd = {
	"@context": "https://schema.org",
	"@type": "Person",
	name: SITE_AUTHOR.name,
	url: SITE_URL,
	jobTitle: "Front-end Developer",
	description: SITE_DESCRIPTION,
	sameAs: [
		"https://github.com/Emiyaaaaa",
		"https://x.com/emiya0505"
	]
};

const websiteJsonLd = {
	"@context": "https://schema.org",
	"@type": "WebSite",
	name: SITE_NAME,
	url: SITE_URL,
	inLanguage: "zh-CN",
	description: SITE_DESCRIPTION,
	author: {
		"@type": "Person",
		name: SITE_AUTHOR.name,
		url: SITE_URL
	}
};

const Home = () => {
	const mdx = getMDXFromPath("./app/(page)/(home)/page.mdx");

	if (!mdx) return null;

	return (
		<div className="flex h-full flex-col">
			<script
				type="application/ld+json"
				// eslint-disable-next-line react/no-danger -- JSON-LD payload is static and trusted
				dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
			/>
			<script
				type="application/ld+json"
				// eslint-disable-next-line react/no-danger -- JSON-LD payload is static and trusted
				dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
			/>
			<div className="flex flex-col items-center">
				<div className="markdown space-y-3 p-6">
					<div className="mb-10 space-y-4 text-5xl font-bold lg:text-6xl lg:leading-[1.2]">
						Hello~
						<br />
						I'm Emiya
					</div>
					<MDXRemote
						source={mdx?.content}
						components={{
							Icon: (props: { src: string; size: string }) => (
								<img
									alt=""
									width={props.size}
									height={props.size}
									src={props.src}
									loading="lazy"
									decoding="async"
									className="inline-block mx-1"
								/>
							),
							WakaTime: () => (
								<div className="mt-4 rounded-md bg-color-font/5 px-4 pb-7 pt-2">
									<p className="mb-2 text-sm">
										My top 3 languages in last 7 days
									</p>
									<WakaTime />
									<p className="float-right mt-[6px] scale-90 text-xs opacity-60">
										*data from wakatime
									</p>
								</div>
							),
						}}
					/>
				</div>
			</div>
		</div>
	);
};

export default Home;
