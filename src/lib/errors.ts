import { Data } from 'effect';

export class NoPackageManagerDetectedError extends Data.TaggedError(
	'NoPackageManagerDetectedError',
)<{
	message: string;
}> {
	constructor() {
		super({
			message:
				'No lock file found. Could not detect package manager (pnpm, bun, or npm).',
		});
	}
}

export class PackageNotFoundError extends Data.TaggedError(
	'PackageNotFoundError',
)<{
	message: string;
}> {
	constructor(packageName: string, availablePackages: Array<string>) {
		super({
			message: `Package "${packageName}" not found. Available packages:\n${availablePackages.map((p) => `  - ${p}`).join('\n')}`,
		});
	}
}
