import { chatsMember } from '../app_modules/chat-member.js';
import { commandsMessage } from '../app_modules/texts.js';
import { ticketVerify } from '../app_modules/ticked-verify.js';

export async function help(ctx) {
	try {
		const isMember = await chatsMember(ctx);
		if (!isMember) return;

		const isActive = await ticketVerify(ctx);
		if (!isActive) return;

		await ctx.reply(commandsMessage);
	} catch (error) {
		console.log(error);
	}
}
