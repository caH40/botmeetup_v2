import 'dotenv/config';

import { BotSetup } from '../model/BotSetup.js';

export async function update(ctx) {
	try {
		const ownerId = process.env.MY_TELEGRAM_ID;
		if (!ownerId) {
			const channelId = ctx.message.forward_from_chat.id;
			await ctx.telegram.sendMessage(channelId, `Нет Id юзера в файле .env`);
			return;
		}

		if (ctx.message.chat.type !== 'channel' && !ctx.message.sender_chat) {
			const chatId = ctx.message.chat.id;
			return await ctx.telegram.sendMessage(
				chatId,
				'Данную команду необходимо запускать в <b>channel</b>',
				{
					parse_mode: 'html',
				}
			);
		}

		const channelId = ctx.message.forward_from_chat.id;
		const channelTitle = ctx.message.forward_from_chat.title;
		const channelName = ctx.message.forward_from_chat.username;
		const groupId = ctx.message.chat.id;
		const groupTitle = ctx.message.chat.title;

		const botSetup = new BotSetup({
			ownerId,
			channelId,
			channelTitle,
			channelName,
			groupId,
			groupTitle,
		});
		const response = await botSetup.save();
		if (response) {
			await ctx.telegram.sendMessage(
				channelId,
				'Данные в БД обновились. Можно переходить к добавлению API-key погоды, добавления мест от куда будет происходить старт, мест мониторинга погоды. В приватном сообщении боту запустите команду /helpA'
			);
		} else {
			await ctx.telegram.sendMessage(channelId, 'Произошла ошибка при обновлении данных.');
		}
	} catch (error) {
		console.log(error);
	}
}
