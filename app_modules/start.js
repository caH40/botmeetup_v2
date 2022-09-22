import { startMessage } from './texts.js';

export async function start(ctx) {
	try {
		const userName = ctx.message.from.username;

		ctx.reply(`Привет ${userName ? userName : 'незнакомец'} ! ${startMessage}`, {
			parse_mode: 'html',
			disable_web_page_preview: true,
		});
	} catch (error) {
		console.log(error);
	}
}
