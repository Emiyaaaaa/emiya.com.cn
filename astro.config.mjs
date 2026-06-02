import { defineConfig, fontProviders } from "astro/config";
import mdx from "@astrojs/mdx";
import tailwindcss from "@tailwindcss/vite";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeExternalLinks from "rehype-external-links";

export default defineConfig({
	site: "https://emiya.com.cn",
	output: "static",
	integrations: [mdx()],
	experimental: {
		fonts: [
			{
				provider: fontProviders.fontsource(),
				name: "Geist Sans",
				cssVariable: "--font-geist",
				weights: [400, 500, 600, 700, 900],
				styles: ["normal"]
			}
		]
	},
	vite: { plugins: [tailwindcss()] },
	markdown: {
		shikiConfig: { theme: "dracula" },
		rehypePlugins: [
			rehypeSlug,
			[
				rehypeAutolinkHeadings,
				{
					behavior: "append",
					properties: { className: ["anchor"] },
					content: { type: "text", value: "#" }
				}
			],
			[
				rehypeExternalLinks,
				{ target: "_blank", rel: ["noopener", "noreferrer"] }
			]
		]
	}
});
