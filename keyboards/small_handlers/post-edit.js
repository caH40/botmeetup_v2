import { BotSetup } from '../../model/BotSetup.js';
import { Post } from '../../model/Post.js';
import { keyboardMain } from '../keyboards.js';
import { mainMenu } from '../mainmenu.js';

export async function postEdit(ctx, cbqData) {
	try {
		const _id = cbqData.slice(16);
		ctx.session.start = keyboardMain;

		const postDB = await Post.findOne({ _id, isLastUpdated: false });
		if (!postDB) return console.log(`Не найден пост с id-${_id}`);
		ctx.session._id = _id;
		ctx.session.date = postDB.date;
		ctx.session.time = postDB.time;
		ctx.session.locationStart = postDB.locationStart;
		ctx.session.locationWeather = postDB.locationWeather;
		ctx.session.distance = postDB.distance;
		ctx.session.speed = postDB.speed;
		ctx.session.photoId = postDB.photoId;
		ctx.session.description = postDB.description;
		ctx.session.userId = postDB.userId;
		ctx.session.leader = postDB.leader;

		ctx.session.start[0][0].text = 'Дата заезда ✔️';
		ctx.session.start[0][1].text = 'Время старта ✔️';
		ctx.session.start[1][0].text = 'Место старта ✔️';
		ctx.session.start[1][1].text = 'Погода ✔️';
		ctx.session.start[2][0].text = 'Дистанция, км ✔️';
		ctx.session.start[2][1].text = 'Средняя скорость ✔️';
		ctx.session.start[3][0].text = 'Картинка ✔️';
		ctx.session.start[3][1].text = 'Описание ✔️';
		await mainMenu(ctx);
	} catch (error) {
		console.log(error);
	}
}

export async function postDelete(ctx, cbqData) {
	try {
		const _id = cbqData.slice(15);
		const postDB = await Post.findOneAndDelete({ _id, isLastUpdated: false });
		if (!postDB) return await ctx.reply('Объявление не найдено');
		await ctx.reply('Объявление удалено с БД!');

		const { botId, messageId } = postDB;

		const botSetupDB = await BotSetup.findOne({ _id: botId });
		if (!botSetupDB)
			return await ctx.reply('Не нашел настроек бота, обратитесь к админу @Aleksandr_BV');
		const { channelId } = botSetupDB;

		await ctx.telegram.deleteMessage(channelId, messageId);
		await ctx.reply('Объявление удалено с канала телеграм!');
	} catch (error) {
		console.log(error);
	}
}
