import { BotSetup } from '../model/BotSetup.js';
import { formFinalPost } from '../app_modules/froms.js';
import { keyboardBack } from './keyboards.js';

export async function sendFinalPost(ctx) {
	//проверка на заполненность всех полей объявления, краткое описание заезда может не заполняться
	const finalPost = formFinalPost(ctx);
	if (finalPost.includes('---') || !ctx.session.photoId) {
		console.log(finalPost);
		await ctx.reply('Не все поля заполнены!!!', {
			reply_markup: { inline_keyboard: keyboardBack },
		});
	} else {
		const { channelId } = await BotSetup.findOne();

		const messageChannel = await ctx.telegram.sendPhoto(channelId, ctx.session.photoId, {
			caption: finalPost,
			parse_mode: 'html',
		});
		// // подсчет количества созданных объявлений
		// await creatRating(userName);
		// // сообщение о размещении объявления на канале
		// await ctx.reply(text.textPost);
		// //запись в базу данных
		// await logsMessagesChannel(messageChannel);
	}
}
