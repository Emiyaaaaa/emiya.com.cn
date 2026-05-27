import React from "react";

function slugify(text: string) {
	const trimmed = text.trim();
	if (!trimmed) return "section";

	const cleaned = trimmed
		.toLowerCase()
		.replace(/[\s\u3000]+/g, "-")
		.replace(
			/[`~!@#$%^&*()=+\[\]{}\\|;:'",.<>/?！？。，；：“”‘’（）【】《》、—]+/g,
			""
		)
		.replace(/-+/g, "-")
		.replace(/^-|-$/g, "");

	if (!cleaned) {
		try {
			return encodeURIComponent(trimmed);
		} catch {
			return "section";
		}
	}

	return cleaned;
}

function Header(props: { level: number; text: string; withHash?: boolean }) {
	const id = React.useMemo(() => slugify(props.text), [props.text]);

	const hash = React.useMemo(() => `#${id}`, [id]);

	return React.createElement(
		`h${props.level}`,
		{ id, className: "font-bold relative group" },
		[
			React.createElement("span", {
				key: "span",
				// eslint-disable-next-line react/no-danger -- heading text comes from trusted MDX source
				dangerouslySetInnerHTML: { __html: props.text }
			}),
			props.withHash ? (
				<a
					key={hash}
					href={hash}
					aria-label={`定位到 ${props.text}`}
					className="px-2 opacity-0 transition-opacity group-hover:opacity-60"
				>
					#
				</a>
			) : null
		]
	);
}

export default Header;
