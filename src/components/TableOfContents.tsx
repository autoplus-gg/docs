"use client";

import type { TOCItemType } from "fumadocs-core/toc";
import Link from "next/link";
import { useEffect, useState } from "react";

export function TableOfContents({ toc }: { toc: TOCItemType[] }) {
	const [activeSection, setActiveSection] = useState("");

	useEffect(() => {
		const handleHashChange = () => setActiveSection(window.location.hash.slice(1));
		handleHashChange();
		window.addEventListener("hashchange", handleHashChange);
		return () => window.removeEventListener("hashchange", handleHashChange);
	}, []);

	useEffect(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				for (const entry of entries) {
					if (entry.isIntersecting) {
						setActiveSection(entry.target.id);
						history.replaceState(null, "", `#${entry.target.id}`);
					}
				}
			},
			{ rootMargin: "-20% 0px -80% 0px" }
		);

		for (const item of toc) {
			const section = document.getElementById(item.url.slice(1));
			if (section) observer.observe(section);
		}

		return () => observer.disconnect();
	}, [toc]);

	return (
		<div className="sticky top-18 col-start-3 row-start-2 mt-4 hidden h-fit max-h-[calc(100vh-6rem)] self-start 2xl:block">
			<div className="m-5 w-64 overflow-y-auto border-l border-gray-200 pl-4 dark:border-gray-200/20">
				<div className="flex flex-col gap-2">
					{toc.map((item) => {
						const id = item.url.slice(1);
						return (
							<Link
								key={item.url}
								href={item.url}
								className={`w-full items-start text-start ${
									activeSection === id ? "text-primary" : "transition-colors duration-200 hover:text-primary"
								}`}
							>
								{item.title}
							</Link>
						);
					})}
				</div>
			</div>
		</div>
	);
}
