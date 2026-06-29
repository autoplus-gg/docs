# Contributing

## Edit documentation

1. Fork this repository and create a focused branch.
2. Edit the relevant file under `content/docs`.
3. Run `bun run check` and `bun run build`.
4. Open a pull request describing the user-facing change.

Keep existing route filenames and explicit heading anchors unless the pull request also provides a compatibility redirect. Changes to security guidance, fees, supported assets, confirmation counts, API contracts, or official Discord identifiers require evidence from an AutoPlus maintainer.

## MDX conventions

- Use Markdown for prose, headings, lists, emphasis, links, and inline code.
- Use an explicit Fumadocs anchor when an existing URL must remain stable: `## Heading [#stable-id]`.
- Use `CopyCode` for values users are expected to copy.
- Use `Block` with `gray`, `blue`, or `red` for the existing callout styles.
- Use `DiscordRoleMention` and `DiscordChannelMention` for Discord-specific UI.
- Use `Endpoint` and `StructureTable` for API reference entries.
- Keep client-side API calls inside typed components rather than embedding fetch logic in MDX.

Every page requires the validated frontmatter fields shown in existing pages. Navigation order is controlled by `content/docs/meta.json` and the numeric `order` field.

## Licensing

By contributing, you agree that code contributions are provided under MIT and documentation/media contributions are provided under CC BY 4.0. Do not submit media or text that you do not have permission to redistribute.
