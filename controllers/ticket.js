import { getKeyboard } from '../keyboards/keyboard-get.js';
import { keyboardTicket } from '../keyboards/keyboards.js';
import { titleMenu } from '../keyboards/ticket/title.js';

export async function ticket(ctx) {
	try {
		ctx.session.messageDel = [];
		const userId = ctx.message.from.id;
		const title = await titleMenu(userId);

		await getKeyboard(ctx, title, keyboardTicket);
	} catch (error) {
		console.log(error);
	}
}
