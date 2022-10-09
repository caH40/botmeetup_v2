//This is a scene for editing an array of cities
import { chatsMember } from '../app_modules/chat-member.js';
import { getKeyboard } from '../keyboards/keyboard-get.js';
import { keyboardAddOrDel } from '../keyboards/keyboards.js';

export async function editLocations(ctx) {
	try {
		const isAdmin = await chatsMember(ctx, 'isAdmin');
		if (!isAdmin) return;

		ctx.session.messageDel = [];

		await getKeyboard(
			ctx,
			'Редактирование списка мест старта. Выберите действие:',
			keyboardAddOrDel()
		);
	} catch (error) {
		console.log(error);
	}
}
