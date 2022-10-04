import { ownerVerify } from '../app_modules/owner-verify.js';
import { getKeyboard } from '../keyboards/keyboard-get.js';
import { keyboardAddOrDel } from '../keyboards/keyboards.js';
//This is a scene for editing an array of cities
export async function editLocations(ctx) {
	try {
		ctx.session.messageDel = [];
		const isOwner = await ownerVerify(ctx);
		// Если не админ то выход из команды /location
		if (!isOwner) return await ctx.reply('Команда доступна только владельцу канала.');

		await getKeyboard(
			ctx,
			'Редактирование массива мест старта. Выберите действие:',
			keyboardAddOrDel()
		);
	} catch (error) {
		console.log(error);
	}
}
