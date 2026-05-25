"use client";
import { IconDark, IconLight } from "@/ui/icon";
import { useTheme } from "next-themes";
import React, { useEffect, useState } from "react";

function ThemeSwitch(props?: { width?: number }) {
	const [mounted, setMounted] = useState(false);
	const { resolvedTheme: theme, setTheme } = useTheme();
	const { width } = props ?? {};

	// https://github.com/pacocoursey/next-themes#avoid-hydration-mismatch
	useEffect(() => {
		setMounted(true);
	}, []);

	const toggleTheme = () => setTheme(theme === "dark" ? "light" : "dark");

	if (!mounted)
		return (
			<span
				role="button"
				aria-label="切换主题"
				className="inline-flex cursor-pointer"
			>
				<IconLight width={width} />
			</span>
		);

	return (
		<span
			role="button"
			aria-label={theme === "dark" ? "切换到浅色主题" : "切换到深色主题"}
			onClick={toggleTheme}
			onKeyDown={(e) => {
				if (e.key === "Enter" || e.key === " ") {
					e.preventDefault();
					toggleTheme();
				}
			}}
			tabIndex={0}
			className="inline-flex cursor-pointer"
		>
			{theme === "dark" ? (
				<IconDark width={width} />
			) : (
				<IconLight width={width} />
			)}
		</span>
	);
}

export default ThemeSwitch;
