interface LLMPage {
	data: {
		getText: (format: "processed") => Promise<string> | string;
		title: string;
	};
	url: string;
}

export async function getLLMText(page: LLMPage) {
	const content = await page.data.getText("processed");

	return `# ${page.data.title}

Source: https://autoplus.gg${page.url}

${content}`;
}
