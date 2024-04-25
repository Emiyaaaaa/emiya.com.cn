import Header from "@/components/Content/Header";
import { Code } from "@/ui/Code";
import { Devider } from "@/ui/Devider";
import Time from "@/ui/Time";
import { MDXRemote } from "next-mdx-remote/rsc";
import React from "react";
import { getMDX } from "../utils";
import "./markdown.scss";

export default async function MdxPage({
	params
}: { params: { title: string } }) {
	const mdx = getMDX(params.title);

	if (!mdx) return null;

	const { metadata, content } = mdx;

	return (
		<>
			<article className="post px-5 pb-6 pt-3">
				<header className="m-1 w-full">
					<h1 className="m-0 text-3xl font-bold leading-snug">
						<span>{metadata.title}</span>
					</h1>
					{metadata.date && (
						<Time
							className="ml-1 mt-4 block opacity-70"
							format="MON DD · YYYY"
							date={new Date(metadata.date)}
						/>
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
							}
						}}
					/>
				</div>
			</article>
		</>
	);
}
