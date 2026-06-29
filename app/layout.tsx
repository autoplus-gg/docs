import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
	metadataBase: new URL("https://autoplus.gg"),
	title: "AutoPlus Documentation",
	description: "Documentation for the AutoPlus automated Discord escrow service."
};

export const viewport: Viewport = {
	themeColor: "#67cfee"
};

export default function RootLayout({ children }: { children: ReactNode }) {
	return (
		<html lang="en">
			<body className="body-background">{children}</body>
		</html>
	);
}
