import { DocsBody, DocsPage, DocsTitle } from "fumadocs-ui/layouts/docs/page";
import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { source } from "../../../lib/source";
import { LLMPageActions, PreviousAndNext, TableOfContents } from "../../../src/components";
import { getDocsMdxComponents } from "../../../src/mdx-components";
import type { DocNeighbour } from "../../../src/types";

interface DocsPageProperties {
	params: Promise<{ slug?: string[] }>;
}

function neighbour(page: ReturnType<typeof source.getPages>[number] | undefined): DocNeighbour | null {
	return page ? { name: page.data.title, url: page.url } : null;
}

export function generateStaticParams() {
	return source.generateParams();
}

export async function generateMetadata({ params }: DocsPageProperties): Promise<Metadata> {
	const { slug = [] } = await params;
	const page = source.getPage(slug);
	if (!page) return {};

	return {
		title: page.data.metadataTitle,
		description: page.data.description,
		openGraph: {
			title: page.data.metadataTitle,
			description: page.data.description,
			...(page.data.ogImage ? { images: [page.data.ogImage] } : {})
		}
	};
}

export default async function DocumentationPage({ params }: DocsPageProperties) {
	const { slug = [] } = await params;
	if (slug.length === 0) redirect("/docs/about-autoplus");

	const page = source.getPage(slug);
	if (!page) notFound();

	const pages = source.getPages().sort((left, right) => left.data.order - right.data.order);
	const pageIndex = pages.findIndex((candidate) => candidate.url === page.url);
	const previous = neighbour(pageIndex > 0 ? pages[pageIndex - 1] : undefined);
	const next = neighbour(pageIndex >= 0 && pageIndex < pages.length - 1 ? pages[pageIndex + 1] : undefined);
	const toc = page.data.toc.filter((item) => item.depth === 2 || item.depth === 3);
	const MdxContent = page.data.body;
	const githubUrl = `https://github.com/autoplus-gg/docs/edit/main/content/docs/${page.path}`;
	const markdownUrl = `${page.url}.md`;

	return (
		<DocsPage
			toc={toc}
			breadcrumb={{ enabled: false }}
			footer={{ enabled: false }}
			tableOfContentPopover={{ enabled: false }}
			tableOfContent={{ component: <TableOfContents toc={toc} /> }}
			className="!relative !row-start-2 !mx-0 !my-5 !min-w-0 !max-w-none !p-4 !px-4 !py-4 lg:!col-start-2 2xl:!px-20"
		>
			<DocsBody className={`autoplus-docs-body ${page.data.spacing === "3" ? "space-y-3" : "space-y-2"}`}>
				<DocsTitle className="!flex !items-center !text-5xl !font-bold">{page.data.heading}</DocsTitle>
				<MdxContent components={getDocsMdxComponents()} />
				<PreviousAndNext previous={previous} next={next} />
				<LLMPageActions githubUrl={githubUrl} markdownUrl={markdownUrl} />
			</DocsBody>
		</DocsPage>
	);
}
