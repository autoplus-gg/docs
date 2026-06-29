import type { ReactNode } from "react";

export type DocIcon = "alert" | "dependabot" | "diamond" | "file-code" | "home" | "hubot" | "person-add" | "repo" | "terminal";

export interface DocNavigationItem {
	icon: DocIcon;
	name: string;
	order: number;
	url: string;
}

export interface DocNeighbour {
	name: string;
	url: string;
}

export interface StructureField {
	description: string;
	field: string;
	type: ReactNode;
}
