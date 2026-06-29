import Link from "next/link";
import type { DocNeighbour } from "../types";

export function PreviousAndNext({ next, previous }: { next: DocNeighbour | null; previous: DocNeighbour | null }) {
	return (
		<div className="mt-10 grid grid-cols-2 gap-4 pt-4">
			{previous ? (
				<Link
					href={previous.url}
					className="rounded-md border border-gray-200/60 p-4 text-sm transition-colors duration-200 hover:border-primary dark:border-gray-200/20"
				>
					Previous
					<div className="flex items-center text-base font-bold text-primary">« {previous.name}</div>
				</Link>
			) : (
				<div />
			)}
			{next ? (
				<Link
					href={next.url}
					className="rounded-md border border-gray-200/60 p-4 text-right text-sm transition-colors duration-200 hover:border-primary dark:border-gray-200/20"
				>
					Next
					<div className="flex items-center justify-end text-base font-bold text-primary">{next.name} »</div>
				</Link>
			) : (
				<div />
			)}
		</div>
	);
}
