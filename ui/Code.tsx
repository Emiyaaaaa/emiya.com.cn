"use client";
import shiki, { type ShikiInterface } from "@/utils/shiki";
import classNames from "classnames";
import React from "react";
import type { LiteralUnion } from "type-fest";

interface Props {
	className?: string;
	code: string;
	language?: LiteralUnion<ShikiInterface.BuiltinLanguage, string>;
}

export function Code(props: Props) {
	const [loading, setLoading] = React.useState(false);
	const ref = React.useRef<HTMLDivElement>(null);

	React.useEffect(() => {
		if (loading) return;
		if (!ref.current) return;
		setLoading(true);
		shiki
			.codeToHtml(props.code, props.language as any)
			.then((html) => {
				if (ref.current) ref.current.innerHTML = html;
			})
			.finally(() => setLoading(false));
	}, [ref.current]);
	return (
		<div className={classNames("ui-code", props.className)} ref={ref}>
			<pre className="shiki">
				<code className="text-slate-100" lang={props.language}>
					{props.code}
				</code>
			</pre>
		</div>
	);
}
