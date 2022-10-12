import { chatsMember } from '../app_modules/chat-member.js';
import { ownerVerify } from '../app_modules/owner-verify.js';
import { getKeyboard } from '../keyboards/keyboard-get.js';
import { keyboardTicket } from '../keyboards/keyboards.js';
import { titleMenu } from '../keyboards/ticket/title.js';

export async function ticket(ctx) {
	try {
		const isMember = await chatsMember(ctx);
		if (!isMember) return;

		const isOwner = await ownerVerify(ctx);
		if (!isOwner) return await ctx.reply('Команда доступна только владельцу канала/группы.');

		ctx.session.messageDel = [];
		const userId = ctx.message.from.id;
		const title = await titleMenu(userId);

		await getKeyboard(ctx, title, keyboardTicket);
	} catch (error) {
		console.log(error);
	}
}
