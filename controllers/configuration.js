import { formConfig } from '../app_modules/forms.js';
import { ownerVerify } from '../app_modules/owner-verify.js';
import { BotSetup } from '../model/BotSetup.js';

export async function getConfiguration(ctx) {
	try {
		const isOwner = await ownerVerify(ctx);
		if (!isOwner) return;
		const configFromDB = await BotSetup.findOne();
		if (!configFromDB) return await ctx.reply('Конфигурация бота не найдена');

		await ctx.reply(formConfig(configFromDB), { parse_mode: 'html' });
	} catch (error) {
		console.log(error);
	}
}
