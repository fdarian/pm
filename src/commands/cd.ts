import * as cli from '@effect/cli';
import { Path } from '@effect/platform';
import { Console, Effect, Option } from 'effect';
import { detectPackageManager } from '#src/pm/detect.ts';
import { PackageManagerService } from '#src/pm/package-manager-service.ts';
import { PackageNotFoundError } from '#src/lib/errors.ts';

const packageNameArg = cli.Args.text({ name: 'package-name' }).pipe(
	cli.Args.optional,
);

export const cdCmd = cli.Command.make('cd', { packageName: packageNameArg }, (args) =>
	Effect.gen(function* () {
		const pm = yield* PackageManagerService;
		const path = yield* Path.Path;
		const pmResult = yield* detectPackageManager;
		const packages = yield* pm.listWorkspacePackages(pmResult.lockDir);

		if (Option.isNone(args.packageName)) {
			for (const pkg of packages) {
				yield* Console.log(pkg.name);
			}
			return;
		}

		const packageName = args.packageName.value;
		const pkg = packages.find((p) => p.name === packageName);

		if (!pkg) {
			return yield* Effect.fail(
				new PackageNotFoundError(
					packageName,
					packages.map((p) => p.name),
				),
			);
		}

		yield* Console.log(path.resolve(pmResult.lockDir, pkg.relDir));
	}),
);
