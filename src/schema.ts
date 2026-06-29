import { z } from "zod";

export const docIconSchema = z.enum([
	"alert",
	"dependabot",
	"diamond",
	"file-code",
	"home",
	"hubot",
	"person-add",
	"repo",
	"terminal"
]);

export const docsPageSchema = z.object({
	heading: z.string(),
	icon: docIconSchema,
	metadataTitle: z.string(),
	navigationTitle: z.string().optional(),
	ogImage: z.string().optional(),
	order: z.number().int().nonnegative(),
	spacing: z.enum(["2", "3"]).default("2")
});
