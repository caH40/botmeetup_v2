import { formPattern } from '../../app_modules/forms.js';
import { Post } from '../../model/Post.js';
import { getKeyboard } from '../keyboard-get.js';
import { keyboardPatternSub, keyboardBack } from '../keyboards.js';

export async function patternsForDel(ctx, cbqData) {
	try {
		const userId = ctx.update.callback_query.from.id;
		const postsDB = await Post.find({ userId });

		for (let index = 0; index < postsDB.length; index++) {
			if (index === postsDB.length - 1) {
				await getKeyboard(ctx, formPattern(postsDB[index]), [
					...keyboardPatternSub(postsDB[index], index, 'del_'),
					...keyboardBack('Вернутся в главное меню', 'meetEdit_pattern_'),
				]);
				return;
			}
			await getKeyboard(
				ctx,
				formPattern(postsDB[index]),
				keyboardPatternSub(postsDB[index], index, 'del_')
			);
		}
	} catch (error) {
		console.log(error);
	}
}
export async function patternDel(ctx, cbqData) {
	try {
	} catch (error) {
		console.log(error);
	}
}
