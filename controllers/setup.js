import { chatsMember } from '../app_modules/chat-member.js';

export async function setup(ctx) {
	try {
		await chatsMember(ctx);

		if (!ctx.session.isAdmin)
			return await ctx.reply(
				`Команда доступна только администраторам канала @${ctx.session.channelName} `
			);

		ctx.scene.enter('setup');
	} catch (error) {
		console.log(error);
	}
}
