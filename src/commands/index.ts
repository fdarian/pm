import { Command } from '@effect/cli';
import { activateCmd } from './activate.ts';
import { addCmd } from './add.ts';
import { cdCmd } from './cd.ts';
import { installCmd, installFullCmd } from './install.ts';
import { lsCmd } from './ls.ts';
import { removeCmd } from './remove.ts';
import { whyCmd } from './why.ts';

export const pmCmd = Command.make('pm').pipe(
	Command.withSubcommands([
		installCmd,
		installFullCmd,
		addCmd,
		removeCmd,
		whyCmd,
		cdCmd,
		lsCmd,
		activateCmd,
	]),
);
