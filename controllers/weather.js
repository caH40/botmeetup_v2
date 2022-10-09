import { chatsMember } from '../app_modules/chat-member.js';
import { getKeyboard } from '../keyboards/keyboard-get.js';
import { keyboardLocation } from '../keyboards/keyboards.js';
import { BotSetup } from '../model/BotSetup.js';
import { Location } from '../model/Location.js';

export async function editLocationsWeather(ctx) {
	try {
		await chatsMember(ctx);
		if (!ctx.session.isAdmin)
			return await ctx.reply(
				`Команда доступна только администраторам канала @${ctx.session.channelName} `
			);

		ctx.session.messageDel = [];

		const userId = ctx.message.from.id;
		const { apiKeyWeather } = await BotSetup.findOne({ ownerId: userId });

		if (!apiKeyWeather)
			return await ctx.reply('Нет ключа API для погоды, выполните настройку /setup');

		const locationsDB = await Location.find({ botId: ctx.session.botId });
		await getKeyboard(
			ctx,
			'Выберите место старта для редактирования его массива мест мониторинга погоды:',
			keyboardLocation(locationsDB, 'locationStart_')
		);
	} catch (error) {
		console.log(error);
	}
}
