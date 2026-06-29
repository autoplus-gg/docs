import {
	AlertIcon,
	DependabotIcon,
	DiamondIcon,
	FileCodeIcon,
	HomeIcon,
	HubotIcon,
	PersonAddIcon,
	RepoIcon,
	TerminalIcon
} from "@primer/octicons-react";
import { docs } from "collections/server";
import { loader } from "fumadocs-core/source";

function docIcon(icon: string | undefined) {
	switch (icon) {
		case "alert":
			return <AlertIcon size={18} />;
		case "dependabot":
			return <DependabotIcon size={18} />;
		case "diamond":
			return <DiamondIcon size={18} />;
		case "file-code":
			return <FileCodeIcon size={18} />;
		case "home":
			return <HomeIcon size={18} />;
		case "hubot":
			return <HubotIcon size={18} />;
		case "person-add":
			return <PersonAddIcon size={18} />;
		case "repo":
			return <RepoIcon size={18} />;
		case "terminal":
			return <TerminalIcon size={18} />;
		default:
			return undefined;
	}
}

export const source = loader({
	baseUrl: "/docs",
	icon: docIcon,
	source: docs.toFumadocsSource()
});
