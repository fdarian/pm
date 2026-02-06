import * as cli from '@effect/cli';
import { Path } from '@effect/platform';
import { Console, Effect, Option } from 'effect';
import { detectPackageManager } from '#src/pm/detect.ts';
import { PackageManagerService } from '#src/pm/package-manager-service.ts';
import { PackageNotFoundError } from '#src/lib/errors.ts';
import { formatWorkspaceTree } from '#src/lib/format-workspace-tree.ts';

const packageNameArg = cli.Args.text({ name: 'package-name' }).pipe(
	cli.Args.optional,
);

const listOption = cli.Options.boolean('list').pipe(
	cli.Options.withDefault(false),
);

export const cdCmd = cli.Command.make(
	'cd',
	{ packageName: packageNameArg, list: listOption },
	(args) =>
		Effect.gen(function* () {
			const pm = yield* PackageManagerService;
			const path = yield* Path.Path;
			const pmResult = yield* detectPackageManager;
			const packages = yield* pm.listWorkspacePackages(pmResult.lockDir);

			if (args.list) {
				for (const pkg of packages) {
					yield* Console.log(pkg.name);
				}
				return;
			}

			if (Option.isNone(args.packageName)) {
				yield* Console.log(pmResult.lockDir);
				return;
			}

			const packageName = args.packageName.value;
			const pkg = packages.find((p) => p.name === packageName);

			if (!pkg) {
				return yield* Effect.fail(
					new PackageNotFoundError(
						packageName,
						formatWorkspaceTree(packages, path.sep),
					),
				);
			}

			yield* Console.log(path.resolve(pmResult.lockDir, pkg.relDir));
		}),
);
