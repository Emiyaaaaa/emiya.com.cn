import type { Metadata } from "next";
import Link from "next/link";
import React from "react";

export const metadata: Metadata = {
	title: "404 页面未找到",
	description: "抱歉，您访问的页面不存在或已被移除。",
	robots: { index: false, follow: false }
};

export default function NotFound() {
	return (
		<div className="px-6 py-16 text-center">
			<h1 className="text-3xl font-bold">404 页面未找到</h1>
			<p className="mt-3 opacity-70">
				抱歉，您访问的页面不存在或已被移除。
			</p>
			<div className="mt-6 flex justify-center gap-4">
				<Link href="/" className="underline">
					返回首页
				</Link>
				<Link href="/blog" className="underline">
					查看博客
				</Link>
			</div>
		</div>
	);
}
