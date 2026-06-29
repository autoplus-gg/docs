"use client";

import { useEffect, useRef, useState } from "react";

type CopyState = "idle" | "copied" | "error";

export function LLMPageActions({ githubUrl, markdownUrl }: { githubUrl: string; markdownUrl: string }) {
	const [copyState, setCopyState] = useState<CopyState>("idle");
	const resetTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

	useEffect(() => {
		return () => {
			if (resetTimeoutRef.current) clearTimeout(resetTimeoutRef.current);
		};
	}, []);

	const copyMarkdown = async () => {
		try {
			const response = await fetch(markdownUrl);
			if (!response.ok) throw new Error(`Markdown request failed with ${response.status}`);
			await navigator.clipboard.writeText(await response.text());
			setCopyState("copied");
		} catch {
			setCopyState("error");
		}

		if (resetTimeoutRef.current) clearTimeout(resetTimeoutRef.current);
		resetTimeoutRef.current = setTimeout(() => setCopyState("idle"), 1200);
	};

	const copyLabel = copyState === "copied" ? "Copied" : copyState === "error" ? "Copy failed" : "Copy Markdown";

	return (
		<div className="absolute top-1 right-4 flex items-center gap-3 text-xs sm:text-sm 2xl:right-20">
			<a href={markdownUrl} target="_blank" rel="noreferrer noopener" className="text-primary hover:underline">
				View Markdown
			</a>
			<button type="button" onClick={copyMarkdown} className="cursor-pointer text-primary hover:underline">
				{copyLabel}
			</button>
			<a href={githubUrl} target="_blank" rel="noreferrer noopener" className="text-primary hover:underline">
				Edit on GitHub
			</a>
		</div>
	);
}
