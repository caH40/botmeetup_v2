import { startMessage } from '../app_modules/texts.js';
import { BotSetup } from '../model/BotSetup.js';

export async function start(ctx) {
	try {
		const { channelName } = await BotSetup.findOne();
		const userName = ctx.message.from.username;

		ctx.reply(`Привет ${userName ? userName : 'незнакомец'} ! ${startMessage(channelName)}`, {
			parse_mode: 'html',
			disable_web_page_preview: true,
		});
	} catch (error) {
		console.log(error);
	}
}
