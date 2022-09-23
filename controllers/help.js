import { commandsMessage } from '../app_modules/texts.js';

export async function help(ctx) {
	try {
		await ctx.reply(commandsMessage);
	} catch (error) {
		console.log(error);
	}
}
