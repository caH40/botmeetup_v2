import 'dotenv/config';
import { chatsMember } from '../app_modules/chat-member.js';

import { BotSetup } from '../model/BotSetup.js';
import { Ticket } from '../model/Ticket.js';
import { dateExpired } from '../utility/utilites.js';

export async function updateGroup(ctx) {
	try {
		const isAdmin = await chatsMember(ctx, 'isAdmin');
		if (!isAdmin) return;

		if (ctx.message.chat.type !== 'supergroup') {
			const chatId = ctx.message.chat.id;
			return await ctx.telegram.sendMessage(
				chatId,
				'Данную команду необходимо запускать в <b>Group</b>',
				{
					parse_mode: 'html',
				}
			);
		}

		const userId = ctx.message.from.id;
		const groupId = ctx.message.chat.id;
		const groupTitle = ctx.message.chat.title;

		const ticketDB = await Ticket.findOne({ ownerId: userId });
		if (!ticketDB) {
			await ctx.reply('У вас нет тикетов для использования бота!');
			return;
		}
		if (!ticketDB.isActive)
			await ctx.reply(`Оплаченный период тикета закончился ${dateExpired(ticketDB)}`);

		//проверка наличия конфигурации Бота с данным groupId, для исключения дублирования настроек ботов
		//если есть, вторым шагом сверить userId === ownerId, если да ==> обновить, если нет, то уже есть бот для этого канала, обратиться к администратору

		const botSetupDB = await BotSetup.findOne({ groupId });

		if (botSetupDB && botSetupDB.ownerId !== userId)
			return await ctx.reply(
				'Уже есть бот для этой группы, если это ваша группа, тогда обратитесь к админу @Aleksandr_BV'
			);

		if (botSetupDB && botSetupDB.ownerId == userId)
			return await ctx.reply(
				'Бот для этой группы уже настроен, если необходимо, выполните команду /updatechannel в канале объявлений.'
			);

		const botSetup = new BotSetup({
			ownerId: userId,
			groupId,
			groupTitle,
		});
		const response = await botSetup.save();

		if (response) {
			await ctx.reply(
				'Данные по группе сохранились в БД. Теперь необходимо выполните команду /updatechannel в канале объявлений.'
			);
		} else {
			await ctx.reply('Произошла ошибка при сохранении данных.');
		}
	} catch (error) {
		console.log(error);
	}
}

export async function updateChannel(ctx) {
	try {
		// нет технической возможности проверять userId при отправке сообщений в канале.
		// проверка на админа перманентная, писать сообщения в канале могут только админы.
		if (!ctx.message.sender_chat) {
			const groupId = ctx.message.chat.id;
			return await ctx.telegram.sendMessage(
				groupId,
				'Данную команду необходимо запускать в <b>Channel</b>',
				{
					parse_mode: 'html',
				}
			);
		}

		const groupId = ctx.message.chat.id;
		const channelId = ctx.message.sender_chat.id;
		const channelTitle = ctx.message.sender_chat.title;
		const channelName = ctx.message.sender_chat.username;

		const botSetupDB = await BotSetup.findOne({ groupId });

		if (!botSetupDB)
			return await ctx.telegram.sendMessage(
				channelId,
				'Нет Бота с настроенной группой для этого канала. Сначала выполните команду /updategroup в привязанной к каналу группе.'
			);

		const response = await BotSetup.findOneAndUpdate(
			{ groupId },
			{ $set: { channelId, channelTitle, channelName } }
		);

		if (response) {
			await ctx.telegram.sendMessage(channelId, 'Данные по каналу сохранились в БД.');
		} else {
			await ctx.telegram.sendMessage(channelId, 'Произошла ошибка при сохранении данных.');
		}
	} catch (error) {
		console.log(error);
	}
}
