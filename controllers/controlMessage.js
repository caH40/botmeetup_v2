import { BotSetup } from '../model/BotSetup.js';
import { Post } from '../model/Post.js';
import { getWeather } from '../weather/getweather.js';

export async function controlMessage(ctx) {
	// проводить проверку по номеру сообщения, сохраненного в БД
	const idMainTelegram = 777000;
	if (ctx.update.message.from.id === idMainTelegram) {
		const { groupId, channelId, channelName } = await BotSetup.findOne();
		const messageId = ctx.update.message.forward_from_message_id;
		const messageIdGroup = ctx.update.message.message_id;
		const { date, locationWeather, _id } = await Post.findOneAndUpdate(
			{ messageId },
			{ $set: { messageIdGroup } }
		);

		// отправляем голосование в группу дискуссий "прикрепляя" его к переадресованному сообщению reply_to_message_id
		const pollAnswers = ['Участвую!', 'Не участвую!', 'Ищу возможность!'];
		const optionalOptions = {
			is_anonymous: false,
			correct_option_id: 0,
			reply_to_message_id: messageIdGroup,
		};

		// добавление голосования кто участвует в заезде в дискуссию о заезде
		const messagePoll = await ctx.telegram.sendPoll(
			groupId,
			'Кто участвует в заезде?',
			pollAnswers,
			optionalOptions
		);

		const poll = messagePoll.poll;
		await Post.findOneAndUpdate({ messageId }, { $set: { poll } });

		// добавление сообщения о погоде в дискуссию о заезде
		let dateClear = date.slice(-10);
		const { formWeatherStr, weatherCurrent } = await getWeather(dateClear, locationWeather);

		const messageWeather = await ctx.telegram.sendMessage(
			groupId,
			formWeatherStr ?? 'нет данных',
			optionalOptions
		);

		const messageIdWeather = messageWeather.message_id;
		await Post.findOneAndUpdate({ _id }, { $set: { messageIdWeather } });
	}
}
