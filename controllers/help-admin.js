import { ownerVerify } from '../app_modules/owner-verify.js';
import { commandsMessageAdmin } from '../app_modules/texts.js';

export async function helpAdmin(ctx) {
	try {
		const isOwner = await ownerVerify(ctx);
		if (!isOwner) return await ctx.reply('Команда доступна только админам.');
		await ctx.reply(commandsMessageAdmin);
	} catch (error) {
		console.log(error);
	}
}
