import 'dotenv/config';
import { Post } from '../model/Post.js';
import { BotSetup } from '../model/BotSetup.js';
import { WeatherDay } from '../model/WeatherDay.js';
import { getWeather } from './getweather.js';
import { isActualDate } from '../utility/utilites.js';

export async function weatherUpdate(bot) {
	try {
		const { groupId } = await BotSetup.findOne();
		const postsDB = await Post.find();

		postsDB.forEach(async elm => {
			const location = elm.locationStart;
			const date = elm.date.slice(-10);
			// исправить на if (!isActualDate(elm)) return

			if (isActualDate(date)) {
				const { formWeather, weatherCurrent } = await getWeather(date, location);
				await bot.telegram.editMessageText(
					groupId,
					elm.messageIdWeather,
					'привет!',
					(formWeather
						? await formWeather
						: 'Необходимо подождать, скоро я смогу предсказать погоду') +
						`\nUpdate: ${new Date().toLocaleString()}`,
					{
						is_anonymous: false,
						correct_option_id: 0,
						reply_to_message_id: elm.messageIdGroup,
						parse_mode: 'html',
					}
				);

				//Обновление данных в БД

				await WeatherDay.findOneAndUpdate(
					{ _id: elm.weatherDayId },
					{
						$set: {
							dateUpdate: weatherCurrent.dateUpdate,
							tempMorn: weatherCurrent.tempMorn,
							tempDay: weatherCurrent.tempDay,
							tempEve: weatherCurrent.tempEve,
							humidity: weatherCurrent.humidity,
							windSpeed: weatherCurrent.windSpeed,
							description: weatherCurrent.description,
						},
					}
				);
			}
		});
	} catch {
		error => console.log(error);
	}
}
