"use client";

import type { CSSProperties, HTMLAttributes, ReactNode } from "react";
import { useEffect, useRef, useState } from "react";
import type { StructureField } from "../types";

export function DocsHeading2({ children, className = "", id, ...props }: HTMLAttributes<HTMLHeadingElement>) {
	return (
		<div className="group relative">
			<h2 {...props} id={id} className={`${className} mt-4 inline-block scroll-mt-16 text-3xl font-bold`}>
				{children}
				{id ? (
					<a
						href={`#${id}`}
						className="ml-2 text-primary opacity-0 transition-opacity group-hover:opacity-100 hover:underline"
						aria-label="Link to section"
					>
						#
					</a>
				) : null}
			</h2>
		</div>
	);
}

export function DocsHeading3({ children, className = "", id, ...props }: HTMLAttributes<HTMLHeadingElement>) {
	return (
		<div className="group relative flex items-center">
			<h3 {...props} id={id} className={`${className} inline-block scroll-mt-16 text-xl font-bold`}>
				{children}
				{id ? (
					<a
						href={`#${id}`}
						className="ml-2 text-primary opacity-0 transition-opacity group-hover:opacity-100 hover:underline"
						aria-label="Link to section"
					>
						#
					</a>
				) : null}
			</h3>
		</div>
	);
}

export function Block({
	children,
	color,
	className = "",
	padding = "p-4"
}: {
	children: ReactNode;
	color: "gray" | "blue" | "red";
	className?: string;
	padding?: string;
}) {
	const colorClasses = {
		blue: "border-blue-800/30 bg-blue-900/20",
		gray: "border-gray-700/20 bg-gray-800/10 dark:border-gray-700/60 dark:bg-gray-800/50",
		red: "border-red-800/30 bg-red-900/20"
	} satisfies Record<typeof color, string>;

	return <div className={`${padding} rounded-lg border ${colorClasses[color]} ${className}`}>{children}</div>;
}

export function InlineCode({ children }: { children?: ReactNode }) {
	return <code className="rounded border border-gray-700/50 bg-gray-900/20 px-0.5 font-mono text-sm">{children}</code>;
}

export function CopyCode({ text }: { text: string }) {
	const [copied, setCopied] = useState(false);
	const copiedTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

	useEffect(() => {
		return () => {
			if (copiedTimeoutRef.current) clearTimeout(copiedTimeoutRef.current);
		};
	}, []);

	return (
		<span className="relative inline-flex items-center">
			<button
				type="button"
				aria-label={`Copy ${text} to clipboard`}
				className="cursor-pointer rounded border border-gray-700/50 bg-gray-900/20 px-0.5 font-mono text-sm"
				onClick={async () => {
					try {
						await navigator.clipboard.writeText(text);
						setCopied(true);
						if (copiedTimeoutRef.current) clearTimeout(copiedTimeoutRef.current);
						copiedTimeoutRef.current = setTimeout(() => setCopied(false), 800);
					} catch {
						setCopied(false);
					}
				}}
			>
				<code>{text}</code>
			</button>
			<span
				aria-live="polite"
				className={`pointer-events-none absolute inset-0 flex items-center justify-center rounded bg-primary/95 px-1 font-sans text-xs font-semibold text-black shadow-sm transition duration-150 ${
					copied ? "scale-100 opacity-100" : "scale-95 opacity-0"
				}`}
			>
				Copied!
			</span>
		</span>
	);
}

export function DiscordRoleMention({ children, color, textColor }: { children: string; color: string; textColor?: string }) {
	const style: CSSProperties & { "--role-color": string } = {
		"--role-color": color,
		color: textColor ?? color
	};

	return (
		<span
			className="rounded bg-[color-mix(in_srgb,var(--role-color)_25%,transparent)] px-0.5 font-medium text-base/[1.35rem] transition-colors hover:bg-[color-mix(in_srgb,var(--role-color)_44%,transparent)]"
			style={style}
		>
			{children}
		</span>
	);
}

export function DiscordChannelMention({ children }: { children: ReactNode }) {
	return (
		<span className="inline-flex h-[1.375rem] cursor-default items-center gap-1 rounded-[3px] bg-[oklab(0.57738_0.0140701_-0.208587_/_0.239216)] px-1 align-[-0.125em] text-base font-medium leading-none text-[oklab(0.803289_0.00450206_-0.0985882)] transition-colors hover:!text-white hover:bg-[#5865f2]">
			<svg aria-hidden="true" width="16" height="16" fill="none" viewBox="0 0 24 24" className="shrink-0">
				<path
					fill="currentColor"
					fillRule="evenodd"
					d="M10.99 3.16A1 1 0 1 0 9 2.84L8.15 8H4a1 1 0 0 0 0 2h3.82l-.67 4H3a1 1 0 1 0 0 2h3.82l-.8 4.84a1 1 0 0 0 1.97.32L8.85 16h4.97l-.8 4.84a1 1 0 0 0 1.97.32l.86-5.16H20a1 1 0 1 0 0-2h-3.82l.67-4H21a1 1 0 1 0 0-2h-3.82l.8-4.84a1 1 0 1 0-1.97-.32L15.15 8h-4.97l.8-4.84ZM14.15 14l.67-4H9.85l-.67 4h4.97Z"
					clipRule="evenodd"
				/>
			</svg>
			<span className="relative -top-px leading-none">{children}</span>
		</span>
	);
}

export function Endpoint({
	children,
	method,
	endpoint,
	id
}: {
	children: ReactNode;
	method: "post" | "get" | "put";
	endpoint: string;
	id: string;
}) {
	const methodColor = {
		get: "border-blue-800/30 bg-blue-900/20",
		post: "border-green-800/30 bg-green-900/20",
		put: "border-amber-800/30 bg-amber-900/20"
	}[method];

	return (
		<div>
			<div className="group relative mt-8 flex items-center">
				<div className={`${methodColor} mr-2 flex items-center gap-2 rounded-full border px-2 p-0.5`}>
					<p className="text-sm font-semibold">{method.toUpperCase()}</p>
				</div>
				<h2 id={id} className="scroll-mt-16 font-mono text-lg font-medium">
					{endpoint}
				</h2>
				<a
					href={`#${id}`}
					className="ml-2 text-xl font-bold text-primary opacity-0 transition-opacity group-hover:opacity-100 hover:underline"
					aria-label="Link to section"
				>
					#
				</a>
			</div>
			{children}
		</div>
	);
}

export function StructureTable({ data }: { data: StructureField[] }) {
	return (
		<div className="mt-0.5 overflow-hidden rounded-lg border border-gray-400/60 dark:border-gray-200/20">
			<table className="w-full">
				<thead className="bg-gray-900/20 text-gray-700 dark:bg-gray-900/30 dark:text-gray-200">
					<tr>
						<th className="p-2 text-left">Field</th>
						<th className="p-2 text-left">Type</th>
						<th className="p-2 text-left">Description</th>
					</tr>
				</thead>
				<tbody className="bg-gray-800/10 text-gray-700 dark:bg-gray-800/20 dark:text-gray-200">
					{data.map((item) => (
						<tr key={item.field} className="border-t border-gray-400/60 dark:border-gray-200/20">
							<td className="p-2">
								<code>{item.field}</code>
							</td>
							<td className="p-2">
								<code>{item.type}</code>
							</td>
							<td className="p-2">{item.description}</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}
