import { RootProvider } from "fumadocs-ui/provider/next";
import type { ReactNode } from "react";
import { source } from "../../lib/source";
import { AutoPlusDocsLayout } from "../../src/layout";
import type { DocNavigationItem } from "../../src/types";
import { PreviewFooter, PreviewNavbar } from "../preview-shell";

export default function DocsLayout({ children }: { children: ReactNode }) {
	const navigation = source
		.getPages()
		.map(
			(page): DocNavigationItem => ({
				icon: page.data.icon,
				name: page.data.navigationTitle ?? page.data.title,
				order: page.data.order,
				url: page.url
			})
		)
		.sort((left, right) => left.order - right.order);

	return (
		<RootProvider theme={{ enabled: false }} search={{ enabled: false }}>
			<AutoPlusDocsLayout tree={source.getPageTree()} navigation={navigation} navbar={<PreviewNavbar />}>
				{children}
			</AutoPlusDocsLayout>
			<PreviewFooter />
		</RootProvider>
	);
}
