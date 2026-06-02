import type { APIRoute } from "astro";

export const prerender = true;

export const GET: APIRoute = ({ site }) => {
	if (!site) {
		throw new Error("Missing `site` in astro.config.mjs");
	}

	const body = `User-agent: *
Allow: /

Sitemap: ${new URL("/sitemap.xml", site.origin).toString()}
`;

	return new Response(body, {
		headers: {
			"Content-Type": "text/plain; charset=utf-8"
		}
	});
};
