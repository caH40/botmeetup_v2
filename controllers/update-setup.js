import { ownerVerify } from '../app_modules/owner-verify.js';
import { BotSetup } from '../model/BotSetup.js';

export async function updateSetupGroup(ctx) {
	try {
		const isOwner = await ownerVerify(ctx);
		// Если не админ то выход из команды /location
		if (!isOwner) return await ctx.reply('Команда доступна только владельцу канала.');

		const userId = ctx.message.from.id;
		const groupId = ctx.message.chat.id;
		const groupTitle = ctx.message.chat.title;

		const chatType = ctx.message.chat.type;

		if (chatType !== 'supergroup') {
			return await ctx.reply('Данную команду необходимо запускать в <b>group</b>', {
				parse_mode: 'html',
			});
		}
		const response = await BotSetup.findOneAndUpdate(
			{ channelOwnerId: userId },
			{
				$set: {
					groupId,
					groupTitle,
				},
			}
		);
		if (response) {
			await ctx.telegram.sendMessage(groupId, 'Данные группы обновлены.');
		} else {
			await ctx.telegram.sendMessage(
				groupId,
				'Произошла ошибка при обновлении данных. Необходимо быть владельцем группы, привязанной к каналу объявлений.'
			);
		}
	} catch (error) {
		console.log(error);
	}
}

export async function updateSetupChannel(ctx) {
	try {
		if (!ctx.message.forward_from_chat) {
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

		const response = await BotSetup.findOneAndUpdate(
			{ groupId },
			{
				$set: {
					channelId,
					channelTitle,
					channelName,
				},
			}
		);
		if (response) {
			await ctx.telegram.sendMessage(channelId, 'Данные канала обновились.');
		} else {
			await ctx.telegram.sendMessage(channelId, 'Произошла ошибка при обновлении данных.');
		}
	} catch (error) {
		console.log(error);
	}
}
