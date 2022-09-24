import { BotSetup } from '../model/BotSetup.js';
import { Post } from '../model/Post.js';
import { formFinalPost } from '../app_modules/froms.js';
import { keyboardBack } from './keyboards.js';
import { posted } from '../app_modules/texts.js';

export async function sendFinalPost(ctx) {
	//проверка на заполненность всех полей объявления, краткое описание заезда может не заполняться
	const finalPost = formFinalPost(ctx);
	if (finalPost.includes('---') || !ctx.session.photoId) {
		await ctx.reply('Не все поля заполнены!!!', {
			reply_markup: { inline_keyboard: keyboardBack },
		});
	} else {
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
			locationStart: ctx.session.locationStart,
			distance: ctx.session.distance,
			level: ctx.session.level,
			speed: ctx.session.speed,
			photoId: ctx.session.photoId,
			description: ctx.session.description,
			messageId,
		});

		const response = await post.save();

		// // подсчет количества созданных объявлений
		// await creatRating(userName);
		// // сообщение о размещении объявления на канале
		// await ctx.reply(text.textPost);
		// //запись в базу данных
		// await logsMessagesChannel(messageChannel);
	}
}
