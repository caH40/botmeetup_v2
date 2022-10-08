import { chatsMember } from '../app_modules/chat-member.js';
import { getKeyboard } from '../keyboards/keyboard-get.js';
import { keyboardAddOrDel } from '../keyboards/keyboards.js';
import { BotSetup } from '../model/BotSetup.js';
//This is a scene for editing an array of cities
export async function editLocations(ctx) {
	try {
		ctx.session.messageDel = [];

		const userId = ctx.message.from.id;
		const botSetupDB = await BotSetup.findOne({ ownerId: userId });
		if (!botSetupDB) return await ctx.reply('Команда доступна только владельцу канала.');

		ctx.session.channelId = botSetupDB.channelId;
		ctx.session.botId = botSetupDB._id;

		await getKeyboard(
			ctx,
			'Редактирование списка мест старта. Выберите действие:',
			keyboardAddOrDel()
		);
	} catch (error) {
		console.log(error);
	}
}
