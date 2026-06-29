"use client";

import { SearchIcon, XIcon } from "@primer/octicons-react";
import { useDocsSearch } from "fumadocs-core/search/client";
import { fetchClient } from "fumadocs-core/search/client/fetch";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

const searchClient = fetchClient();

function readableText(value: string) {
	return value.replaceAll(/<\/?mark>/g, "").replaceAll(/[`*_~]/g, "");
}

export function DocsSearch() {
	const [isOpen, setIsOpen] = useState(false);
	const inputRef = useRef<HTMLInputElement>(null);
	const { search, setSearch, query } = useDocsSearch({ client: searchClient });
	const results = query.data && query.data !== "empty" ? query.data : [];

	useEffect(() => {
		const handleKeyboard = (event: KeyboardEvent) => {
			if (event.key.toLowerCase() === "k" && (event.ctrlKey || event.metaKey)) {
				event.preventDefault();
				setIsOpen(true);
			}

			if (event.key === "Escape") setIsOpen(false);
		};

		window.addEventListener("keydown", handleKeyboard);
		return () => window.removeEventListener("keydown", handleKeyboard);
	}, []);

	useEffect(() => {
		if (isOpen) inputRef.current?.focus();
	}, [isOpen]);

	const close = () => {
		setIsOpen(false);
		setSearch("");
	};

	return (
		<>
			<button
				type="button"
				onClick={() => setIsOpen(true)}
				className="flex w-full cursor-pointer items-center gap-2 rounded-md border border-gray-400/10 bg-gray-300/10 p-1 px-4 text-left backdrop-blur-lg transition-colors duration-200 hover:bg-primary/15 hover:text-primary dark:border-gray-200/10 dark:bg-gray-500/10 dark:hover:bg-gray-300/10"
			>
				<SearchIcon size={18} />
				<span>Search</span>
				<kbd className="ml-auto text-xs opacity-60">Ctrl K</kbd>
			</button>
			{isOpen
				? createPortal(
						<>
							<button
								type="button"
								aria-label="Close documentation search"
								className="fixed inset-0 z-190 cursor-default bg-black/55"
								onClick={close}
							/>
							<div
								role="dialog"
								aria-modal="true"
								aria-label="Search documentation"
								className="fixed top-[12vh] left-1/2 z-200 flex max-h-[75vh] w-[calc(100%-2rem)] max-w-2xl -translate-x-1/2 flex-col overflow-hidden rounded-lg border border-gray-300 bg-white text-black shadow-2xl dark:border-gray-200/20 dark:bg-[#0b0b0b] dark:text-white"
							>
								<div className="flex items-center gap-3 border-b border-gray-300 px-4 dark:border-gray-200/20">
									<SearchIcon size={20} className="shrink-0 text-primary" />
									<input
										ref={inputRef}
										value={search}
										onChange={(event) => setSearch(event.target.value)}
										placeholder="Search documentation..."
										aria-label="Search documentation"
										className="min-w-0 flex-1 bg-transparent py-4 outline-none placeholder:text-gray-500"
									/>
									<button
										type="button"
										onClick={close}
										aria-label="Close documentation search"
										className="cursor-pointer rounded p-1 text-gray-500 transition-colors hover:bg-gray-500/10 hover:text-primary"
									>
										<XIcon size={20} />
									</button>
								</div>
								<div className="min-h-32 overflow-y-auto p-2" aria-live="polite">
									{search.trim().length === 0 ? (
										<p className="p-4 text-center text-sm text-gray-500">Start typing to search the documentation.</p>
									) : query.isLoading ? (
										<p className="p-4 text-center text-sm text-gray-500">Searching...</p>
									) : results.length === 0 ? (
										<p className="p-4 text-center text-sm text-gray-500">No documentation found.</p>
									) : (
										<ul className="flex flex-col gap-1">
											{results.slice(0, 20).map((result) => (
												<li key={result.id}>
													<Link
														href={result.url}
														onClick={close}
														className="block rounded-md px-3 py-2 transition-colors hover:bg-primary/10"
													>
														{result.breadcrumbs?.length ? (
															<span className="block text-xs text-gray-500">
																{result.breadcrumbs.map(readableText).join(" / ")}
															</span>
														) : null}
														<span className="block text-sm">{readableText(result.content)}</span>
													</Link>
												</li>
											))}
										</ul>
									)}
								</div>
							</div>
						</>,
						document.body
					)
				: null}
		</>
	);
}
