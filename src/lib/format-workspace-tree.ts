export const formatWorkspaceTree = (
	packages: Array<{ name: string; relDir: string }>,
	sep: string,
) => {
	const grouped = new Map<string, Array<{ name: string; dirName: string }>>();
	for (const pkg of packages) {
		const parts = pkg.relDir.split(sep);
		const group = parts[0];
		const dirName = parts.slice(1).join(sep);
		if (!grouped.has(group)) {
			grouped.set(group, []);
		}
		grouped.get(group)!.push({ name: pkg.name, dirName });
	}

	const lines: Array<string> = [];
	const groupEntries = Array.from(grouped.entries());
	for (let gi = 0; gi < groupEntries.length; gi++) {
		const [group, entries] = groupEntries[gi];
		const isLastGroup = gi === groupEntries.length - 1;
		const groupPrefix = isLastGroup ? '└── ' : '├── ';
		const childIndent = isLastGroup ? '    ' : '│   ';
		lines.push(`${groupPrefix}${group}/`);
		for (let ei = 0; ei < entries.length; ei++) {
			const entry = entries[ei];
			const isLastEntry = ei === entries.length - 1;
			const entryPrefix = isLastEntry ? '└── ' : '├── ';
			lines.push(
				`${childIndent}${entryPrefix}${entry.dirName} "${entry.name}"`,
			);
		}
	}
	return lines;
};
