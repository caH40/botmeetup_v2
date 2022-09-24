import { viewConfig } from '../app_modules/froms.js';
import { BotSetup } from '../model/BotSetup.js';

export async function configuration(ctx) {
	try {
		const configFromDB = await BotSetup.findOne();
		if (!configFromDB) return await ctx.reply('Конфигурация бота не найдена');

		await ctx.reply(viewConfig(configFromDB), { parse_mode: 'html' });
	} catch (error) {
		console.log(error);
	}
}
