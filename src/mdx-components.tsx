import defaultMdxComponents from "fumadocs-ui/mdx";
import type { MDXComponents } from "mdx/types";
import {
	Block,
	CopyCode,
	DiscordChannelMention,
	DiscordRoleMention,
	DocsHeading2,
	DocsHeading3,
	Endpoint,
	InlineCode,
	ServerList,
	StructureTable,
	SupportedCryptocurrencies
} from "./components";

export function getDocsMdxComponents(overrides?: MDXComponents): MDXComponents {
	return {
		...defaultMdxComponents,
		h2: DocsHeading2,
		h3: DocsHeading3,
		code: InlineCode,
		Block,
		CopyCode,
		DiscordChannelMention,
		DiscordRoleMention,
		Endpoint,
		ServerList,
		StructureTable,
		SupportedCryptocurrencies,
		...overrides
	};
}
