import { commandsMessage } from './texts.js';

export async function help(ctx) {
	try {
		await ctx.reply(commandsMessage);
	} catch (error) {
		console.log(error);
	}
}
