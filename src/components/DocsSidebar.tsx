"use client";

import {
	AlertIcon,
	DependabotIcon,
	DiamondIcon,
	FileCodeIcon,
	HomeIcon,
	HubotIcon,
	PersonAddIcon,
	RepoIcon,
	TerminalIcon,
	XIcon
} from "@primer/octicons-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { type ReactNode, useEffect, useSyncExternalStore } from "react";
import type { DocIcon, DocNavigationItem } from "../types";
import { DocsSearch } from "./DocsSearch";

let mobileSidebarOpen = false;
const sidebarListeners = new Set<() => void>();

function subscribeToSidebar(listener: () => void) {
	sidebarListeners.add(listener);
	return () => sidebarListeners.delete(listener);
}

function setMobileSidebarOpen(open: boolean) {
	mobileSidebarOpen = open;
	for (const listener of sidebarListeners) listener();
}

function getMobileSidebarState() {
	return mobileSidebarOpen;
}

function getServerSidebarState() {
	return false;
}

const icons: Record<DocIcon, ReactNode> = {
	alert: <AlertIcon size={18} />,
	dependabot: <DependabotIcon size={18} />,
	diamond: <DiamondIcon size={18} />,
	"file-code": <FileCodeIcon size={18} />,
	home: <HomeIcon size={18} />,
	hubot: <HubotIcon size={18} />,
	"person-add": <PersonAddIcon size={18} />,
	repo: <RepoIcon size={18} />,
	terminal: <TerminalIcon size={18} />
};

function SidebarButton({ item, onNavigate }: { item: DocNavigationItem; onNavigate: () => void }) {
	const pathname = usePathname();
	const isActive = pathname === item.url;

	return (
		<Link href={item.url} onClick={onNavigate}>
			<span
				className={`flex w-full items-center gap-2 rounded-md border border-gray-400/10 p-1 px-4 backdrop-blur-lg transition-colors duration-200 dark:border-gray-200/10 ${
					isActive
						? "bg-primary/15 text-primary dark:bg-gray-300/10"
						: "cursor-pointer bg-gray-300/10 hover:bg-primary/15 hover:text-primary dark:bg-gray-500/10 dark:hover:bg-gray-300/10"
				}`}
			>
				{icons[item.icon]} {item.name}
			</span>
		</Link>
	);
}

export function DocsSidebar({ items }: { items: DocNavigationItem[] }) {
	const isVisible = useSyncExternalStore(subscribeToSidebar, getMobileSidebarState, getServerSidebarState);

	useEffect(() => {
		const handleResize = () => {
			if (window.innerWidth >= 1024) setMobileSidebarOpen(false);
		};

		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);

	return (
		<>
			<button
				type="button"
				aria-label={isVisible ? "Close documentation menu" : "Open documentation menu"}
				onClick={() => setMobileSidebarOpen(!isVisible)}
				className="fixed bottom-4 left-4 z-55 rounded-full border border-gray-200/10 bg-gray-600/5 p-3 shadow-lg backdrop-blur lg:hidden"
			>
				{isVisible ? <XIcon size={24} /> : <RepoIcon size={24} />}
			</button>
			<button
				type="button"
				aria-label="Close documentation menu"
				className={isVisible ? "fixed inset-0 z-40 bg-black/50 lg:hidden" : "hidden"}
				onClick={() => setMobileSidebarOpen(false)}
			/>
			<aside
				className={`fixed left-0 z-50 h-full text-gray-200 transition-transform duration-300 lg:static lg:z-auto lg:col-start-1 lg:row-start-2 lg:block lg:h-auto lg:min-h-[calc(100vh-2.5rem)] lg:text-black dark:text-white ${
					isVisible ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
				}`}
			>
				<div
					style={{ minHeight: "calc(100% - 3.5em)" }}
					className="w-64 overflow-y-auto rounded-md border-r border-gray-200/50 bg-gray-600/5 p-4 backdrop-blur lg:m-5 lg:h-auto lg:border dark:border-gray-200/10"
				>
					<div className="flex flex-col gap-2">
						<DocsSearch />
						{items.map((item) => (
							<SidebarButton key={item.url} item={item} onNavigate={() => setMobileSidebarOpen(false)} />
						))}
					</div>
				</div>
			</aside>
		</>
	);
}
