import { BotSetup } from '../model/BotSetup.js';
import { Post } from '../model/Post.js';
import { formFinalPost } from './forms.js';
import { keyboardBack } from '../keyboards/keyboards.js';
import { posted } from './texts.js';
import { updatePhoto } from './update-post.js';

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
			const _id = ctx.session._id;
			if (_id) {
				const postDB = await Post.findOneAndUpdate(
					{ _id },
					{
						$set: {
							date: ctx.session.date,
							time: ctx.session.time,
							locationStart: ctx.session.locationStart,
							locationWeather: ctx.session.locationWeather,
							distance: ctx.session.distance,
							level: ctx.session.level,
							speed: ctx.session.speed,
							photoId: ctx.session.photoId,
							description: ctx.session.description,
						},
					},
					{ returnDocument: 'after' }
				);
				await updatePhoto(ctx, postDB).catch(error => console.log(error));
				return console.log('Пост обновился');
			}

			const { channelId, channelName } = await BotSetup.findOne();
			if (!channelId) return await ctx.reply('Не нашел id канала для размещения объявления');

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
				channelId,
				date: ctx.session.date,
				time: ctx.session.time,
				leader: ctx.session.leader,
				userId: ctx.session.userId,
				locationStart: ctx.session.locationStart,
				locationWeather: ctx.session.locationWeather,
				distance: ctx.session.distance,
				level: ctx.session.level,
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
