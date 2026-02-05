import { Command as ShellCommand } from '@effect/platform';
import { Effect } from 'effect';

export const runShellCommand = (cmd: ShellCommand.Command) =>
	Effect.scoped(
		Effect.gen(function* () {
			const process = yield* cmd.pipe(
				ShellCommand.stdin('inherit'),
				ShellCommand.stdout('inherit'),
				ShellCommand.stderr('inherit'),
				ShellCommand.start,
			);
			return yield* process.exitCode;
		}),
	);
