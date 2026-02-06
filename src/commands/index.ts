import { Command } from '@effect/cli';
import { activateCmd } from './activate.ts';
import { addCmd } from './add.ts';
import { cdCmd } from './cd.ts';
import { installCmd, installFullCmd } from './install.ts';
import { removeCmd } from './remove.ts';

export const pmCmd = Command.make('pm').pipe(
	Command.withSubcommands([installCmd, installFullCmd, addCmd, removeCmd, cdCmd, activateCmd]),
);
