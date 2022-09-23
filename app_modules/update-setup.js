import { BotSetup } from '../model/BotSetup.js';

export async function updateSetupGroup(ctx) {
	try {
		const userId = ctx.message.from.id;
		const groupId = ctx.message.chat.id;
		const groupTitle = ctx.message.chat.title;

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
			await ctx.telegram.sendMessage(groupId, 'Произошла ошибка при обновлении данных.');
		}
	} catch (error) {
		console.log(error);
	}
}

export async function updateSetupChannel(ctx) {
	try {
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
			await ctx.telegram.sendMessage(
				channelId,
				'Данные канала, можно удалить последние сообщения.'
			);
		} else {
			await ctx.telegram.sendMessage(channelId, 'Произошла ошибка при обновлении данных.');
		}
	} catch (error) {
		console.log(error);
	}
}
