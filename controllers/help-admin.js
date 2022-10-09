import { chatsMember } from '../app_modules/chat-member.js';
import { commandsMessageAdmin } from '../app_modules/texts.js';

export async function helpAdmin(ctx) {
	try {
		const isAdmin = await chatsMember(ctx, 'isAdmin');
		if (!isAdmin) return;

		await ctx.reply(commandsMessageAdmin);
	} catch (error) {
		console.log(error);
	}
}
