import { Devider } from "@/ui/Devider";
import Time from "@/ui/Time";
import type { UIProps } from "@/utils/util.typing";
import classNames from "classnames";
import type React from "react";
import "./index.scss";

type CardProps = UIProps<
	React.PropsWithChildren<{
		title: string | React.ReactNode;
		description?: string;
		tags?: string[];
		created_at?: Date | null;
		right?: React.ReactNode;
	}>
>;

function Card(props: CardProps) {
	return (
		<>
			<article className={classNames("overflow-hidden", props.className)}>
				<div className="relative mb-0.5 flex flex-col justify-center p-6">
					{typeof props.title === "string" ? (
						<h2 className="m-0 text-lg font-black tracking-wide">
							{props.title}
						</h2>
					) : (
						props.title
					)}
					{props.description && (
						<p className="mt-2 line-clamp-2 text-sm opacity-70">
							{props.description}
						</p>
					)}
					<div className="mt-1 flex flex-wrap">
						{props.tags?.filter(Boolean).map((tag, i) => (
							<span className="tag mr-4" key={i} data-tag={tag.toLowerCase()}>
								{tag}
							</span>
						))}
					</div>
					{props.children}
					<Time
						format="MON DD · YYYY"
						className="right-3 mt-1 block text-sm font-semibold tracking-wide opacity-60"
						date={props.created_at}
					/>
				</div>
			</article>
			<Devider />
		</>
	);
}

export default Card;
