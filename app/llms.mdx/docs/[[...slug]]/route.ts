import { notFound } from "next/navigation";
import { source } from "../../../../lib/source";
import { getLLMText } from "../../../../src/llms";

interface MarkdownRouteProperties {
	params: Promise<{ slug?: string[] }>;
}

export const revalidate = false;

export async function GET(_request: Request, { params }: MarkdownRouteProperties) {
	const { slug = [] } = await params;
	const page = source.getPage(slug);
	if (!page) notFound();

	return new Response(await getLLMText(page), {
		headers: {
			"Content-Type": "text/markdown; charset=utf-8"
		}
	});
}

export function generateStaticParams() {
	return source.generateParams();
}
