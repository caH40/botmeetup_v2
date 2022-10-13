import 'dotenv/config';
import { Post } from '../model/Post.js';
import { BotSetup } from '../model/BotSetup.js';
import { getWeather } from './weather-get.js';
import { isActualDate } from '../utility/utilites.js';

export async function weatherUpdate(bot) {
	try {
		const postsDB = await Post.find();

		postsDB.forEach(async elm => {
			const location = elm.locationWeather;
			const date = elm.date.slice(-10);
			const time = elm.time;

			let isActual = isActualDate(date, time);
			if (!isActual) return;

			const { formWeatherStr, weatherCurrent } = await getWeather(date, location);

			//если нет данных в БД, то выход
			if (!formWeatherStr) return console.log('В БД нет данных о погоде');
			//если нет данных о погоде то обновлять на пустые строки
			weatherCurrent.tempDay ??= '';
			weatherCurrent.humidity ??= '';

			await Post.findOneAndUpdate(
				{ _id: elm._id },
				{
					$set: {
						tempDay: weatherCurrent.tempDay,
						humidity: weatherCurrent.humidity,
						descriptionWeather: weatherCurrent.desc,
					},
				}
			).catch(error => console.log('ошибка в weather-update.js'));

			//обновление поста в телеграм
			const { groupId } = await BotSetup.findOne({ _id: elm.botId });
			await bot.telegram
				.editMessageText(
					groupId,
					elm.messageIdWeather,
					'привет!',
					formWeatherStr + `\nUpdate: ${new Date().toLocaleString()}`,
					{
						reply_to_message_id: elm.messageIdGroup,
						parse_mode: 'html',
					}
				)
				.catch(error => console.log('ошибка в weather-update.js, нет messageIdWeather'));
		});
	} catch (error) {
		console.log(error);
	}
}
