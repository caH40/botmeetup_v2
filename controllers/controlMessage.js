import { Poll } from '../model/Poll.js';
import { Post } from '../model/Post.js';
import { getWeather } from '../weather/weather-get.js';

export async function controlMessage(ctx) {
	try {
		// проводить проверку по номеру сообщения, сохраненного в БД
		const idMainTelegram = 777000;
		if (ctx.update.message.from.id === idMainTelegram) {
			// тут необходимо проверять актуальность тикета оплаты
			const groupId = ctx.update.message.chat.id;
			const messageId = ctx.update.message.forward_from_message_id;
			const messageIdGroup = ctx.update.message.message_id;
			const postDB = await Post.findOneAndUpdate({ messageId }, { $set: { messageIdGroup } });
			if (!postDB) return;
			const { date, locationWeather, _id } = postDB;

			// отправляем голосование в группу дискуссий "прикрепляя" его к переадресованному сообщению reply_to_message_id
			const pollAnswers = ['Участвую!', 'Не участвую!', 'Ищу возможность!'];
			const optionalOptions = {
				is_anonymous: false,
				correct_option_id: 0,
				reply_to_message_id: messageIdGroup,
			};

			// добавление голосования кто участвует в заезде в дискуссию о заезде
			ctx.telegram
				.sendPoll(groupId, 'Кто участвует в заезде?', pollAnswers, optionalOptions)
				.then(data => {
					console.log(data.poll);
					return data;
				})
				.then(data => {
					const poll = new Poll({
						postId: _id,
						pollId: data.poll.id,
					});
					poll.save();
				});

			// добавление сообщения о погоде в дискуссию о заезде
			let dateClear = date.slice(-10);
			const { formWeatherStr, weatherCurrent } = await getWeather(dateClear, locationWeather);

			const messageWeather = await ctx.telegram.sendMessage(
				groupId,
				formWeatherStr ?? 'нет данных',
				optionalOptions
			);
			//добавление данных о погоде в БД
			const messageIdWeather = messageWeather.message_id;
			await Post.findOneAndUpdate(
				{ _id },
				{
					$set: {
						messageIdWeather,
						tempDay: weatherCurrent.tempDay,
						humidity: weatherCurrent.humidity,
						descriptionWeather: weatherCurrent.desc,
					},
				}
			);
		}
	} catch (error) {
		console.log(error);
	}
}
