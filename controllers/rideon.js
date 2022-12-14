import { chatsMember } from '../app_modules/chat-member.js';
import { ticketVerify } from '../app_modules/ticked-verify.js';

export async function rideOn(ctx) {
	try {
		// проверка наличия username
		const userName = ctx.message.from.username;
		const messageId = ctx.message.message_id;

		if (!userName)
			return await ctx.reply('Пользователи с приватным аккаунтом не могут создавать объявления');

		const isMember = await chatsMember(ctx);
		if (!isMember) return;

		const isActive = await ticketVerify(ctx);
		if (!isActive) return;

		//при замене значения из модуля на keyboardMain, смешиваются ответы из разных сессий!!
		ctx.session.messageDel = [];
		ctx.session.start = [
			[
				{ text: 'Дата заезда', callback_data: 'meetDate' },
				{ text: 'Время старта', callback_data: 'meetTime' },
			],
			[
				{ text: 'Место старта', callback_data: 'meetLocation' },
				{ text: 'Погода', callback_data: 'meetWeather' },
			],
			[
				{ text: 'Дистанция, км', callback_data: 'meetDistance' },
				{ text: 'Средняя скорость', callback_data: 'meetSpeed' },
				// { text: 'Сложность заезда', callback_data: 'meetLevel' },
			],
			[
				{ text: 'Картинка', callback_data: 'meetCover' },
				{ text: 'Описание', callback_data: 'meetDescription' },
			],
			[{ text: 'Использовать ранее созданное объявление', callback_data: 'meetPattern' }],
			[{ text: 'Сводные данные по заезду', callback_data: 'meetSummary' }],
		];

		await ctx
			.deleteMessage(messageId)
			.catch(error =>
				console.log(
					new Date().toLocaleString(),
					'ошибка при удалении сообщения',
					'module - rideon.js'
				)
			);
		await ctx.reply('Выберите блок заполнения', {
			reply_markup: { inline_keyboard: ctx.session.start },
		});
	} catch (error) {
		console.error(error);
	}
}
