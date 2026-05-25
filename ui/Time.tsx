import type { UIProps } from "@/utils/util.typing";
import React from "react";

function transformDate(date: Date, format?: string) {
	if (!format) return date.toLocaleString();
	const year = date.getFullYear();
	const month = date.getMonth() + 1;
	const day = date.getDate();
	const hour = date.getHours() + 1;
	const minute = date.getMinutes() + 1;
	const second = date.getSeconds() + 1;

	const dateString = format
		.replace("YYYY", year.toString())
		.replace("YY", year.toString().slice(2))
		.replace("MON", date.toLocaleString("en-US", { month: "long" }))
		.replace("MM", month.toString())
		.replace("DD", day.toString())
		.replace("HH", hour.toString())
		.replace("mm", minute.toString())
		.replace("ss", second.toString());

	return dateString;
}

function transformDuration(second: number, format?: string) {
	if (!format) return second.toString();
	const hour = Math.floor(second / 3600);
	const minute = Math.floor((second % 3600) / 60);
	const secondLeft = second % 60;

	let durationString = format;

	if (hour) durationString = durationString.replace("hh", hour.toString());
	else durationString = durationString.replace(/\(hh .*?\)/g, "");

	if (minute) durationString = durationString.replace("mm", minute.toString());
	else durationString = durationString.replace(/\(mm .*?\)/g, "");

	if (secondLeft)
		durationString = durationString.replace("ss", secondLeft.toString());
	else durationString = durationString.replace(/\(ss .*?\)/g, "");

	durationString = durationString.replace(/[()]/g, "");

	return durationString;
}

function Time(
	props: UIProps<{
		date?: Date | null;
		format?: string;
	}>
) {
	if (!props.date) return null;
	return (
		<time className={props.className} dateTime={props.date.toLocaleString()}>
			{transformDate(props.date, props.format)}
		</time>
	);
}

function Duration(props: UIProps<{ second?: number | null; format?: string }>) {
	if (!props.second) return null;
	return (
		<time className={props.className}>
			{transformDuration(props.second, props.format)}
		</time>
	);
}

export default Time;
export { Time, Duration };
