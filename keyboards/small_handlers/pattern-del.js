import { formPattern } from '../../app_modules/forms.js';
import { Post } from '../../model/Post.js';
import { getKeyboard } from '../keyboard-get.js';
import { keyboardPatternSub, keyboardBack } from '../keyboards.js';
import { mainMenu } from '../mainmenu.js';

export async function patternsForDel(ctx, cbqData) {
	try {
		const userId = ctx.update.callback_query.from.id;
		const postsDB = await Post.find({ userId, isPattern: true });

		for (let index = 0; index < postsDB.length; index++) {
			if (index === postsDB.length - 1) {
				const response = await getKeyboard(ctx, formPattern(postsDB[index], index), [
					...keyboardPatternSub(postsDB[index], index, 'del_', 'Удалить объявление №'),
					...keyboardBack('Вернутся в главное меню', 'meetEdit_pattern_'),
				]);
				ctx.session.messageDel.push(response);
				return;
			}
			const response = await getKeyboard(
				ctx,
				formPattern(postsDB[index], index),
				keyboardPatternSub(postsDB[index], index, 'del_', 'Удалить объявление №')
			);
			ctx.session.messageDel.push(response);
		}
	} catch (error) {
		console.log(error);
	}
}
export async function patternDel(ctx, cbqData) {
	try {
		const _id = cbqData.slice(11);
		const postDB = await Post.findOneAndUpdate({ _id }, { $set: { isPattern: false } });
		await mainMenu(ctx);
	} catch (error) {
		console.log(error);
	}
}
