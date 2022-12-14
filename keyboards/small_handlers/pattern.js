import { Post } from '../../model/Post.js';
import { getKeyboard } from '../keyboard-get.js';
import { keyboardBack, keyboardPattern } from '../keyboards.js';

export async function patternPost(ctx, cbqData) {
	try {
		const userId = ctx.update.callback_query.from.id;
		const postsDB = await Post.find({ userId, isPattern: true });

		if (postsDB.length == 0) {
			await getKeyboard(
				ctx,
				'У вас нет ни одного сохраненного объявления о велозаезде.',
				keyboardBack('Вернутся в главное меню', 'meetEdit_')
			);

			return;
		}
		await getKeyboard(ctx, 'Выберите действие с сохраненными объявлениями. ', keyboardPattern);
	} catch (error) {
		console.log(error);
	}
}
