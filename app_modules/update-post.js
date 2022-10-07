import { Post } from '../model/Post.js';
import { formFinalPostUpdate } from './forms.js';
import { isActualDate } from '../utility/utilites.js';
import { BotSetup } from '../model/BotSetup.js';

export async function updatePost(bot, postId) {
	try {
		//если необходимо обновить конкретный Пост, а не все Посты
		if (postId) {
			const post = await Post.findOne({ _id: postId });
			await editMessageTelegram(bot, post);
			return;
		}
		// обновление всех постов по таймауту

		const postsDB = await Post.find({ isLastUpdated: false });

		for (let index = 0; index < postsDB.length; index++) {
			await editMessageTelegram(bot, postsDB[index]);
		}
	} catch (error) {
		console.log(error);
	}
}

export async function updatePhoto(bot, post) {
	try {
		const botSetupDB = await BotSetup.findOne({ ownerId: post.userId });
		if (!botSetupDB)
			return await ctx.reply('Не нашел настроек бота, обратитесь к админу @Aleksandr_BV');
		const { channelId } = botSetupDB;

		const formPostString = formFinalPostUpdate(post);
		const messageId = post.messageId;
		const photoId = post.photoId;
		await bot.telegram.editMessageMedia(
			channelId,
			messageId,
			{},
			{ type: 'photo', media: photoId, caption: formPostString, parse_mode: 'html' }
		);
	} catch (error) {
		console.log(error);
	}
}

async function editMessageTelegram(bot, post) {
	try {
		const formPostString = formFinalPostUpdate(post);

		const botSetupDB = await BotSetup.findOne({ _id: post.botId });
		if (!botSetupDB)
			return await ctx.reply('Не нашел настроек бота, обратитесь к админу @Aleksandr_BV');
		const { channelId } = botSetupDB;

		const response = await bot.telegram
			.editMessageCaption(channelId, post.messageId, 'привет!', formPostString, {
				parse_mode: 'html',
			})
			.catch(error =>
				console.log(
					new Date().toLocaleString(),
					'ошибка при обновлении постов, старый пост такой же как и обновлённый',
					'module - update-posts.js'
				)
			);

		let date = post.date;
		let time = post.time;
		//это последнее обновление поста
		if (!isActualDate(date, time)) {
			await Post.findOneAndUpdate({ _id: post }, { $set: { isLastUpdated: true } });
		}
	} catch (error) {
		console.log(error);
	}
}
