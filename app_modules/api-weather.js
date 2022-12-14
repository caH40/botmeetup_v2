import { BotSetup } from '../model/BotSetup.js';

export async function apiWeather(ctx) {
	try {
		const userId = ctx.message.from.id;

		const message = ctx.message.text;
		if (message.length == 32) {
			const apiKey = message.slice(-32);
			const response = await BotSetup.findOne({ ownerId: userId });
			if (!response)
				return await ctx.reply('Вы не являетесь владельцем канала. Для выхода введите /quit');
			await BotSetup.findOneAndUpdate({ ownerId: userId }, { $set: { apiKeyWeather: apiKey } });
			await ctx.reply('Отлично, ключ сохранен в базе данных. Для выхода введите /quit');
		} else {
			await ctx.reply('Неверный формат ввода ключа, попробуйте еще. Для выхода введите /quit');
		}
	} catch (error) {
		console.log(error);
	}
}
