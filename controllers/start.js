import { chatsMember } from '../app_modules/chat-member.js';
import { startMessage } from '../app_modules/texts.js';
import { ticketVerify } from '../app_modules/ticked-verify.js';

export async function start(ctx) {
	try {
		const isMember = await chatsMember(ctx);
		if (!isMember) return;

		const isActive = await ticketVerify(ctx);
		if (!isActive) return;

		const userName = ctx.message.from.username;

		ctx.reply(
			`Привет ${userName ? userName : 'незнакомец'} ! ${startMessage(ctx.session.channelName)}`,
			{
				parse_mode: 'html',
				disable_web_page_preview: true,
			}
		);
	} catch (error) {
		console.log(error);
	}
}
