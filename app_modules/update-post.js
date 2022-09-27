import { Post } from '../model/Post.js';
import { formFinalPostUpdate } from './forms.js';
import { isActualDate } from '../utility/utilites.js';

export async function updatePost(bot, postId) {
	try {
		//если необходимо обновить конкретный Пост, а не все Посты
		if (postId) {
			const post = await Post.findOne({ _id: postId });
			await editMessageTelegram(bot, post);
			return;
		}
		// обновление всех постов по таймауту
		const postsDB = await Post.find({ isLastUpdate: false });

		for (let index = 0; index < postsDB.length; index++) {
			await editMessageTelegram(bot, postsDB[index]);
		}
	} catch (error) {
		console.log(error);
	}
}

async function editMessageTelegram(bot, post) {
	try {
		const formPostString = await formFinalPostUpdate(post);
		await bot.telegram
			.editMessageCaption(post.channelId, post.messageId, 'привет!', formPostString, {
				parse_mode: 'html',
			})
			.catch(error =>
				console.log(
					new Date().toLocaleString(),
					'ошибка при обновлении постов, старый пост такой же как и обновлённый'
				)
			);
		let date = post.date;
		let time = post.time;
		//это последнее обновление поста
		if (!isActualDate(date, time)) {
			await Post.findOneAndUpdate({ _id: post }, { $set: { isLastUpdate: true } });
		}
	} catch (error) {
		console.log(error);
	}
}
