import 'dotenv/config';
import { Post } from '../model/Post.js';
import { BotSetup } from '../model/BotSetup.js';
import { getWeather } from './weather-get.js';
import { isActualDate } from '../utility/utilites.js';

export async function weatherUpdate(bot) {
	try {
		const postsDB = await Post.find();

		for (let i = 0; i < postsDB.length; i++) {
			const location = postsDB[i].locationWeather;
			const date = postsDB[i].date.slice(-10);
			const time = postsDB[i].time;

			let isActual = isActualDate(date, time);
			if (!isActual) return;

			const { formWeatherStr, weatherCurrent } = await getWeather(date, location);

			//если нет данных в БД, то выход
			if (!formWeatherStr) return console.log('В БД нет данных о погоде');
			//если нет данных о погоде то обновлять на пустые строки
			weatherCurrent.tempDay ??= '';
			weatherCurrent.humidity ??= '';

			await Post.findOneAndUpdate(
				{ _id: postsDB[i]._id },
				{
					$set: {
						tempDay: weatherCurrent.tempDay,
						humidity: weatherCurrent.humidity,
						descriptionWeather: weatherCurrent.desc,
					},
				}
			).catch(error => console.log('ошибка в weather-update.js'));

			//обновление поста в телеграм
			const { groupId } = await BotSetup.findOne({ _id: postsDB[i].botId });
			await bot.telegram
				.editMessageText(
					groupId,
					postsDB[i].messageIdWeather,
					'привет!',
					formWeatherStr + `\nUpdate: ${new Date().toLocaleString()}`,
					{
						reply_to_message_id: postsDB[i].messageIdGroup,
						parse_mode: 'html',
					}
				)
				.catch(error => console.log('ошибка в weather-update.js, нет messageIdWeather'));
		}
	} catch (error) {
		console.log(error);
	}
}
