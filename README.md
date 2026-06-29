# AutoPlus Documentation

This repository contains the public documentation for [AutoPlus](https://autoplus.gg). The documentation is written in MDX, rendered with Fumadocs, and integrated into the main website at `/docs`.

## Local preview

Install [Bun](https://bun.sh), then run:

```bash
bun install
bun run dev
```

Open `http://localhost:5173/docs/about-autoplus`.

Run all validation before opening a pull request:

```bash
bun run check
bun run build
```

## Repository structure

- `content/docs`: contributor-facing MDX pages and navigation metadata.
- `src/components`: typed interactive components available to MDX.
- `src`: the production docs layout, component map, schemas, and public interfaces.
- `app`: a standalone preview application. The production website injects its shared Navbar and footer.
- `public`: documentation media used by the preview and production integration.

See [CONTRIBUTING.md](./CONTRIBUTING.md) for the editing workflow and MDX component reference.

## Licensing

Source code is licensed under the [MIT License](./LICENSE). Documentation and first-party media are licensed under [CC BY 4.0](./LICENSE-DOCS). Third-party names, marks, and interface elements remain the property of their respective owners.
