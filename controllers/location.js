import { chatsMember } from '../app_modules/chat-member.js';
import { getKeyboard } from '../keyboards/keyboard-get.js';
import { keyboardAddOrDel } from '../keyboards/keyboards.js';
import { BotSetup } from '../model/BotSetup.js';
//This is a scene for editing an array of cities
export async function editLocations(ctx) {
	try {
		await chatsMember(ctx);

		ctx.session.messageDel = [];

		if (!ctx.session.isAdmin)
			return await ctx.reply(
				`Команда доступна только администраторам канала @${ctx.session.channelName} `
			);

		await getKeyboard(
			ctx,
			'Редактирование списка мест старта. Выберите действие:',
			keyboardAddOrDel()
		);
	} catch (error) {
		console.log(error);
	}
}
