import { BotSetup } from '../model/BotSetup.js';
import { Post } from '../model/Post.js';
import { formFinalPost } from './forms.js';
import { keyboardBack } from '../keyboards/keyboards.js';
import { posted } from './texts.js';
import { updatePhoto } from './update-post.js';
import { weatherUpdate } from '../weather/weather-update.js';

export async function sendFinalPost(ctx) {
	try {
		//проверка на заполненность всех полей объявления, краткое описание заезда может не заполняться
		const userId = ctx.update.callback_query.from.id;

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

			const botsSetupDB = await BotSetup.find();
			let chatMember;
			const channels = [];

			for (let index = 0; index < botsSetupDB.length; index++) {
				chatMember = await ctx.telegram.getChatMember(botsSetupDB[index].channelId, userId);
				if (chatMember.status === 'member' || chatMember.status === 'creator')
					channels.push(botsSetupDB[index].channelId);
			}

			if (channels.length == 0)
				return await ctx.reply(
					'Для публикации объявления необходимо состоять в соответствующем канале.'
				);

			if (channels.length > 1)
				return await ctx.reply(
					'Вы состоите в нескольких каналах объявлений о велозаездах, где используется данный бот. К сожалению, бот может создавать объявление, когда пользователь состоит только в одном канале объявлений велозаездов.'
				);

			const botSetupDB = await BotSetup.findOne({ channelId: channels[0] });

			if (!botSetupDB)
				return await ctx.reply('Не нашел настроек бота, обратитесь к админу @Aleksandr_BV');
			const { _id, channelId, channelName } = botSetupDB;

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
