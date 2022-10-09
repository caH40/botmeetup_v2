import { chatsMember } from '../app_modules/chat-member.js';
import { formConfig } from '../app_modules/forms.js';
import { BotSetup } from '../model/BotSetup.js';

export async function getConfiguration(ctx) {
	try {
		const isAdmin = await chatsMember(ctx, 'isAdmin');
		if (!isAdmin) return;

		const configFromDB = await BotSetup.findOne({ _id: ctx.session.botId });
		if (!configFromDB) return await ctx.reply('Конфигурация бота не найдена');

		await ctx.reply(formConfig(configFromDB), { parse_mode: 'html' });
	} catch (error) {
		console.log(error);
	}
}
