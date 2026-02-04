import { Command } from '@effect/cli';
import { installCmd } from './install.ts';

export const pmCmd = Command.make('pm').pipe(
	Command.withSubcommands([installCmd]),
);
