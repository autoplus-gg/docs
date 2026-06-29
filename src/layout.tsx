"use client";

import type { Root } from "fumadocs-core/page-tree";
import { DocsLayout } from "fumadocs-ui/layouts/docs";
import { SidebarProvider, SidebarTrigger, useSidebar } from "fumadocs-ui/layouts/docs/slots/sidebar";
import { type ComponentProps, createContext, type ReactNode, use } from "react";
import { DocsSidebar } from "./components";
import type { DocNavigationItem } from "./types";

const NavigationContext = createContext<DocNavigationItem[] | null>(null);

function SidebarRoot() {
	const navigation = use(NavigationContext);
	if (!navigation) throw new Error("Documentation navigation is unavailable");
	return <DocsSidebar items={navigation} />;
}

function LayoutContainer({ children, className = "", ...props }: ComponentProps<"div">) {
	return (
		<div
			{...props}
			id="autoplus-docs-layout"
			className={`${className} grid min-h-screen grid-cols-1 lg:grid-cols-[18.5rem_minmax(0,1fr)] 2xl:grid-cols-[18.5rem_minmax(0,1fr)_18.5rem]`}
		>
			{children}
		</div>
	);
}

export function AutoPlusDocsLayout({
	children,
	navigation,
	navbar,
	tree
}: {
	children: ReactNode;
	navigation: DocNavigationItem[];
	navbar: ReactNode;
	tree: Root;
}) {
	return (
		<NavigationContext value={navigation}>
			<DocsLayout
				tree={tree}
				tabs={false}
				nav={{ component: <div className="col-span-full row-start-1">{navbar}</div> }}
				searchToggle={{ enabled: false }}
				themeSwitch={{ enabled: false }}
				slots={{
					container: LayoutContainer,
					sidebar: {
						provider: SidebarProvider,
						root: SidebarRoot,
						trigger: SidebarTrigger,
						useSidebar
					}
				}}
				sidebar={{ collapsible: false }}
			>
				{children}
			</DocsLayout>
		</NavigationContext>
	);
}
