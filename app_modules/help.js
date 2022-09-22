import { commandsMessage } from './texts.js';

export async function help(ctx) {
	ctx.reply(commandsMessage);
}
