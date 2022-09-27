import 'dotenv/config';
import { Post } from '../model/Post.js';
import { BotSetup } from '../model/BotSetup.js';
// import { WeatherDay } from '../model/WeatherDay.js';
import { getWeather } from './getweather.js';
import { isActualDate } from '../utility/utilites.js';

export async function weatherUpdate(bot) {
	try {
		const { groupId } = await BotSetup.findOne();
		const postsDB = await Post.find();

		postsDB.forEach(async elm => {
			const location = elm.locationStart;
			const date = elm.date.slice(-10);
			const time = elm.time;
			// исправить на if (!isActualDate(elm)) return

			if (isActualDate(date, time) && elm.isActual) {
				const { formWeatherStr, weatherCurrent } = await getWeather(date, location);

				await Post.findOneAndUpdate(
					{ _id: elm._id },
					{
						$set: {
							tempDay: weatherCurrent.tempDay,
							humidity: weatherCurrent.humidity,
							descriptionWeather: weatherCurrent.desc,
						},
					}
				);

				await bot.telegram.editMessageText(
					groupId,
					elm.messageIdWeather,
					'привет!',
					(formWeatherStr
						? await formWeatherStr
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
			} else {
				await Post.findOneAndUpdate({ _id: elm._id }, { $set: { isActual: false } });
			}
		});
	} catch {
		error => console.log(error);
	}
}

//отдельная коллекция для погоды
// await WeatherDay.findOneAndUpdate(
// 	{ _id: elm.weatherDayId },
// 	{
// 		$set: {
// 			dateUpdate: weatherCurrent.dateUpdate,
// 			tempMorn: weatherCurrent.tempMorn,
// 			tempDay: weatherCurrent.tempDay,
// 			tempEve: weatherCurrent.tempEve,
// 			humidity: weatherCurrent.humidity,
// 			windSpeed: weatherCurrent.windSpeed,
// 			descriptionWeather: weatherCurrent.desc,
// 		},
// 	}
// );
