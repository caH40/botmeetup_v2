import { BotSetup } from '../model/BotSetup.js';

export async function configuration(ctx) {
	try {
		const response = await BotSetup.findOne();
		if (!response) return await ctx.reply('Конфигурация бота не найдена');

		await ctx.reply(
			`<b>channelOwnerId:</b> ${response.channelOwnerId}\n<b>channelId:</b> ${response.channelId}\n<b>channelTitle:</b> ${response.channelTitle}\n<b>channelName:</b> ${response.channelName}\n<b>groupId:</b> ${response.groupId}\n<b>groupTitle:</b> ${response.groupTitle}\n<b>apiWeather:</b> ${response.apiWeather}\n`,
			{ parse_mode: 'html' }
		);
	} catch (error) {
		console.log(error);
	}
}
