import { ownerVerify } from '../app_modules/owner-verify.js';
import { getKeyboard } from '../keyboards/keyboard-get.js';
import { keyboardLocation } from '../keyboards/keyboards.js';
import { BotSetup } from '../model/BotSetup.js';
import { Location } from '../model/Location.js';

export async function editLocationsWeather(ctx) {
	try {
		ctx.session.messageDel = [];

		const userId = ctx.message.from.id;
		const botSetupDB = await BotSetup.findOne({ ownerId: userId });
		if (!botSetupDB) return await ctx.reply('Команда доступна только владельцу канала.');

		ctx.session.channelId = botSetupDB.channelId;
		ctx.session.botId = botSetupDB._id;

		if (!botSetupDB.apiKeyWeather)
			return await ctx.reply('Нет ключа API для погоды, выполните настройку /setup');

		const locationsDB = await Location.find({ botId: botSetupDB._id });
		await getKeyboard(
			ctx,
			'Выберите место старта для редактирования его массива мест мониторинга погоды:',
			keyboardLocation(locationsDB, 'locationStart_')
		);
	} catch (error) {
		console.log(error);
	}
}
