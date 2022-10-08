import { BotSetup } from '../model/BotSetup.js';
import { Post } from '../model/Post.js';
import { formFinalPost } from './forms.js';
import { keyboardBack } from '../keyboards/keyboards.js';
import { posted } from './texts.js';
import { updatePhoto } from './update-post.js';
import { weatherUpdate } from '../weather/weather-update.js';
import { chatsMember } from './chat-member.js';

export async function sendFinalPost(ctx) {
	try {
		//проверка на заполненность всех полей объявления, краткое описание заезда может не заполняться

		const finalPost = formFinalPost(ctx);
		if (finalPost.includes('---') || !ctx.session.photoId) {
			await ctx.reply('Не все поля заполнены!!!', {
				reply_markup: { inline_keyboard: keyboardBack('Продолжить ввод данных', 'meetEdit_') },
			});
		} else {
			// обновление отредактированного поста
			const _idPost = ctx.session._id;
			if (_idPost) {
				const postDB = await Post.findOneAndUpdate(
					{ _id: _idPost },
					{
						$set: {
							date: ctx.session.date,
							time: ctx.session.time,
							locationStart: ctx.session.locationStart,
							locationWeather: ctx.session.locationWeather,
							distance: ctx.session.distance,
							speed: ctx.session.speed,
							photoId: ctx.session.photoId,
							description: ctx.session.description,
						},
					},
					{ returnDocument: 'after' }
				);
				await updatePhoto(ctx, postDB).catch(error => console.log(error));
				await weatherUpdate(ctx);
				return;
			}

			const channelId = ctx.session.channelId;
			const botSetupDB = await BotSetup.findOne({ channelId });
			if (!botSetupDB)
				return await ctx.reply('Не нашел настроек бота, обратитесь к админу @Aleksandr_BV');
			const { _id, channelName } = botSetupDB;

			const messageChannel = await ctx.telegram.sendPhoto(channelId, ctx.session.photoId, {
				caption: finalPost,
				parse_mode: 'html',
			});

			// сообщение о размещении объявления на канале
			const postMessage = posted(channelName);
			await ctx.reply(postMessage);
			//номер сообщения в канале
			const messageId = messageChannel.message_id;

			const post = new Post({
				botId: _id,
				date: ctx.session.date,
				time: ctx.session.time,
				leader: ctx.session.leader,
				userId: ctx.session.userId,
				locationStart: ctx.session.locationStart,
				locationWeather: ctx.session.locationWeather,
				distance: ctx.session.distance,
				speed: ctx.session.speed,
				photoId: ctx.session.photoId,
				description: ctx.session.description,
				messageId,
				isLastUpdated: false,
			});

			await post.save();
		}
	} catch (error) {
		console.log(error);
	}
}
