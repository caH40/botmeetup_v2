import 'dotenv/config';
import { Post } from '../model/Post.js';
import { BotSetup } from '../model/BotSetup.js';
import { getWeather } from './getweather.js';

export async function weatherUpdate(bot) {
	try {
		const { groupId } = await BotSetup.findOne();
		const postsDB = await Post.find();

		postsDB.forEach(async elm => {
			const date = elm.date.slice(-10);
			const location = elm.locationStart;

			const dateArr = date.split('.');
			const lag = 80000000;
			let dateNewFormat = [dateArr[1], dateArr[0], dateArr[2]].join('.');
			let dateMilliseconds = new Date(dateNewFormat).getTime() + lag;
			let todayMilliseconds = new Date().getTime();

			if (dateMilliseconds > todayMilliseconds) {
				await bot.telegram
					.editMessageText(
						groupId,
						elm.messageIdGroup,
						'привет!',
						((await getWeather(date, location))
							? await getWeather(date, location)
							: 'Необходимо подождать, скоро я смогу предсказать погоду') +
							`\nUpdate: ${new Date().toLocaleString()}`,
						{
							is_anonymous: false,
							correct_option_id: 0,
							reply_to_message_id: elm.messageGroupWeather.reply_to_message.message_id,
							parse_mode: 'html',
						}
					)
					.catch(error => console.log(error));
			}
		});
	} catch {
		err => console.log(err);
	}
}
