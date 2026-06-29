"use client";

import type { TOCItemType } from "fumadocs-core/toc";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export function TableOfContents({ toc }: { toc: TOCItemType[] }) {
	const [activeSection, setActiveSection] = useState("");
	const scrollAreaRef = useRef<HTMLDivElement>(null);

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

	useEffect(() => {
		const container = scrollAreaRef.current;
		if (!container || !activeSection) return;

		const activeLink = Array.from(container.querySelectorAll<HTMLAnchorElement>("[data-toc-id]")).find(
			(link) => link.dataset.tocId === activeSection
		);
		if (!activeLink) return;

		const itemTop = activeLink.offsetTop;
		const itemBottom = itemTop + activeLink.offsetHeight;
		const viewTop = container.scrollTop;
		const viewBottom = viewTop + container.clientHeight;
		if (itemTop >= viewTop && itemBottom <= viewBottom) return;

		container.scrollTo({
			top: itemTop - (container.clientHeight - activeLink.offsetHeight) / 2,
			behavior: "smooth"
		});
	}, [activeSection]);

	return (
		<div className="sticky top-18 col-start-3 row-start-2 hidden h-[calc(100vh-4.5rem)] min-h-0 flex-col self-start 2xl:flex">
			<div
				ref={scrollAreaRef}
				className="relative m-5 min-h-0 w-64 flex-1 overflow-y-auto border-l border-gray-200 pr-2 pl-4 [scrollbar-color:#424243_transparent] [scrollbar-width:thin] dark:border-gray-200/20"
			>
				<div className="flex flex-col gap-1">
					{toc.map((item, index) => {
						const id = item.url.slice(1);
						const nested = item.depth === 3;
						const active = activeSection === id;
						return (
							<Link
								key={item.url}
								href={item.url}
								data-toc-id={id}
								className={`w-full items-start text-start ${
									nested
										? `pl-3 text-sm ${active ? "" : "text-gray-500 dark:text-gray-400"}`
										: `${index > 0 ? "mt-2 " : ""}font-medium`
								} ${active ? "text-primary" : "transition-colors duration-200 hover:text-primary"}`}
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
