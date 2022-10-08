import { chatsMember } from '../app_modules/chat-member.js';
import { formPattern } from '../app_modules/forms.js';
import { editPostText } from '../app_modules/texts.js';
import { getKeyboard } from '../keyboards/keyboard-get.js';
import { keyboardBack, keyboardEdit } from '../keyboards/keyboards.js';
import { Post } from '../model/Post.js';

export async function editPost(ctx) {
	try {
		const channelId = await chatsMember(ctx);
		if (!channelId) return;

		const response = await ctx.reply(editPostText);
		ctx.session.messageDel = [];
		ctx.session.messageDel.push(response.message_id);

		const userId = ctx.update.message.from.id;
		//сделать проверку
		const postsDB = await Post.find({ userId, isLastUpdated: false });

		if (postsDB.length == 0) await ctx.reply('У вас нет объявлений для редактирования/удаления!');

		for (let index = 0; index < postsDB.length; index++) {
			if (index === postsDB.length - 1) {
				let keyboard = [
					...keyboardEdit(postsDB[index], index),
					...keyboardBack('Выход из редактирования', 'meetEdit_edit_'),
				];

				const response = await getKeyboard(ctx, formPattern(postsDB[index], index), keyboard);

				ctx.session.messageDel.push(response);
				return;
			}

			const response = await getKeyboard(
				ctx,
				formPattern(postsDB[index], index),
				keyboardEdit(postsDB[index], index)
			);
			ctx.session.messageDel.push(response);
		}
	} catch (error) {
		console.log(error);
	}
}
