import { chatsMember } from '../app_modules/chat-member.js';
import { commandsMessageAdmin } from '../app_modules/texts.js';

export async function helpAdmin(ctx) {
	try {
		await chatsMember(ctx);

		if (!ctx.session.isAdmin)
			return await ctx.reply(
				`Команда доступна только администраторам канала @${ctx.session.channelName} `
			);

		await ctx.reply(commandsMessageAdmin);
	} catch (error) {
		console.log(error);
	}
}
