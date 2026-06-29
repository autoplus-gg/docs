import Link from "next/link";
import type { ReactNode } from "react";

export function PreviewNavbar() {
	return (
		<div className="sticky top-0 z-100">
			<nav className="w-full border-b border-b-gray-200/10 py-3 backdrop-blur drop-shadow-sm/5">
				<div className="mx-auto flex w-2/3 items-center justify-between">
					<Link href="/" className="flex items-center gap-2 text-2xl font-bold">
						<span className="text-primary">◉</span> AutoPlus
					</Link>
					<div className="flex gap-2 text-sm font-semibold">
						<Link
							href="/docs/about-autoplus"
							className="rounded-md border border-gray-200/10 bg-primary/15 px-3 py-1.5 text-primary"
						>
							Documentation
						</Link>
						<a href="https://autoplus.gg" className="rounded-md border border-gray-200/10 px-3 py-1.5">
							AutoPlus.gg
						</a>
					</div>
				</div>
			</nav>
		</div>
	);
}

export function PreviewFooter({ children }: { children?: ReactNode }) {
	return (
		<footer className="flex w-full justify-center border-t border-gray-200/10 py-6 backdrop-blur">
			<div className="flex w-full max-w-3xl justify-between">
				<strong>AutoPlus Documentation</strong>
				<a href="https://github.com/autoplus-gg/docs" className="text-primary hover:underline">
					Contribute on GitHub
				</a>
				{children}
			</div>
		</footer>
	);
}
