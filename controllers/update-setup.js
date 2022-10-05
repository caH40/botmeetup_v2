import 'dotenv/config';

import { BotSetup } from '../model/BotSetup.js';

export async function update(ctx) {
	try {
		const channelOwnerId = process.env.MY_TELEGRAM_ID;
		const userId = ctx.message.from.id;
		const isOwner = userId == channelOwnerId;
		if (!isOwner) return await ctx.reply('Команда доступна только владельцу канала.');
		if (!channelOwnerId) {
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
		if (ctx.update.message.reply_to_message) {
			const senderChatId = ctx.update.message.chat.id;
			const messageIdGroup = ctx.update.message.message_id;
			await ctx.telegram.sendMessage(
				senderChatId,
				'Данную команду необходимо запускать в <b>channel</b>',
				{
					reply_to_message_id: messageIdGroup,
					parse_mode: 'html',
				}
			);
			return;
		}

		const channelId = ctx.message.forward_from_chat.id;
		const channelTitle = ctx.message.forward_from_chat.title;
		const channelName = ctx.message.forward_from_chat.username;
		const groupId = ctx.message.chat.id;
		const groupTitle = ctx.message.chat.title;

		const botSetup = new BotSetup({
			channelOwnerId,
			channelId,
			channelTitle,
			channelName,
			groupId,
			groupTitle,
		});
		const response = await botSetup.save();
		if (response) {
			await ctx.telegram.sendMessage(channelId, 'Данные обновились.');
		} else {
			await ctx.telegram.sendMessage(channelId, 'Произошла ошибка при обновлении данных.');
		}
	} catch (error) {
		console.log(error);
	}
}
