import { source } from "../../lib/source";
import { getLLMText } from "../../src/llms";

export const revalidate = false;

export async function GET() {
	const pages = source.getPages().sort((left, right) => left.data.order - right.data.order);
	const content = await Promise.all(pages.map(getLLMText));

	return new Response(content.join("\n\n"), {
		headers: {
			"Content-Type": "text/plain; charset=utf-8"
		}
	});
}
