"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { z } from "zod";
import { CopyCode } from "./DocsComponents";

const serverSchema = z.object({
	icon: z.string().nullable(),
	id: z.string(),
	name: z.string()
});

const serverListSchema = z.array(serverSchema);
type ServerData = z.infer<typeof serverSchema>;

function truncateText(text: string, maxLength: number) {
	return text.length > maxLength ? `${text.slice(0, maxLength)}..` : text;
}

export function ServerList() {
	const [isVisible, setIsVisible] = useState(false);
	const [serverList, setServerList] = useState<ServerData[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(false);

	useEffect(() => {
		const fetchServerList = async () => {
			try {
				const response = await fetch("https://api.autoplus.gg/v1/servers");
				if (!response.ok) throw new Error(`Server list request failed with ${response.status}`);

				const result = serverListSchema.safeParse(await response.json());
				if (!result.success) throw new Error("Server list response did not match the expected schema");

				setServerList(result.data);
				setError(false);
			} catch {
				setError(true);
			} finally {
				setLoading(false);
			}
		};

		void fetchServerList();
	}, []);

	return (
		<div className="mt-2">
			<button type="button" onClick={() => setIsVisible((visible) => !visible)} className="flex items-center gap-2 text-primary">
				<span className={`transform transition-transform duration-200 ${isVisible ? "rotate-90" : ""}`}>▶</span>
				<span className="hover:underline">Show server list</span>
			</button>
			<div className={`overflow-hidden transition-all duration-200 ${isVisible ? "mt-2 max-h-[1000px]" : "max-h-0"}`}>
				{loading ? (
					<p className="py-2">Loading server list...</p>
				) : error ? (
					<p className="py-2 text-red-500">Failed to load server list. Please try again later.</p>
				) : (
					<ul className="list-inside list-disc">
						{serverList.map((server) => (
							<li key={server.id}>
								{server.icon ? (
									<Image
										src={server.icon}
										alt={`${server.name} icon`}
										width={16}
										height={16}
										className="mr-1 inline h-4 w-4 rounded-full"
										unoptimized
									/>
								) : null}
								<span className="hidden md:inline">{server.name}</span>
								<span className="md:hidden">{truncateText(server.name, 15)}</span> (<CopyCode text={server.id} />)
							</li>
						))}
					</ul>
				)}
			</div>
		</div>
	);
}
