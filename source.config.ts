import { pageSchema } from "fumadocs-core/source/schema";
import { defineConfig, defineDocs } from "fumadocs-mdx/config";
import { docsPageSchema } from "./src/schema";

export const docs = defineDocs({
	dir: "content/docs",
	docs: {
		postprocess: {
			includeProcessedMarkdown: true
		},
		schema: pageSchema.extend(docsPageSchema.shape)
	}
});

export default defineConfig();
