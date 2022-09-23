import { BotSetup } from '../model/BotSetup.js';

export async function apiWeather(ctx) {
	try {
		const userId = ctx.message.from.id;

		const message = ctx.message.text;
		if (message.includes('API ') && message.length == 36) {
			const apiKey = message.slice(-32);
			const response = await BotSetup.findOne({ channelOwnerId: userId });
			if (!response)
				return await ctx.reply('Вы не являетесь владельцем канала. Для выхода введите /quit');
			await BotSetup.findOneAndUpdate({ channelOwnerId: userId }, { $set: { apiWeather: apiKey } });
			await ctx.reply('Отлично, ключ сохранен в базе данных. Для выхода введите /quit');
		} else {
			await ctx.reply('Неверный формат ввода ключа, попробуйте еще. Для выхода введите /quit');
		}
	} catch (error) {
		console.log(error);
	}
}
