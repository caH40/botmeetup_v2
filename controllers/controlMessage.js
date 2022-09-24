import { BotSetup } from '../model/BotSetup.js';

export async function controlMessage(ctx) {
	// проводить проверку по номеру сообщения, сохраненного в БД
	const idMainTelegram = 777000;
	if (ctx.update.message.from.id === idMainTelegram) {
		const { groupId, channelId, channelName } = await BotSetup.findOne();
		console.log('controlMessage', ctx);
		// отправляем голосование в группу дискуссий "прикрепляя" его к переадресованному сообщению reply_to_message_id
		const pollAnswers = ['Участвую!', 'Не участвую!', 'Ищу возможность!'];
		const optionalOptions = {
			is_anonymous: false,
			correct_option_id: 0,
			reply_to_message_id: ctx.update.message.message_id,
		};

		// добавление голосования кто участвует в заезде в дискуссию о заезде
		const messageIdPoll = await ctx.telegram.sendPoll(
			groupId,
			'Кто участвует в заезде?',
			pollAnswers,
			optionalOptions
		);
		// // добавление сообщения о погоде в дискуссию о заезде
		// let dateClear = members.dateM.slice(-10);
		// const messageIdWeather = await ctx.telegram.sendMessage(
		// 	process.env.GROUP_TELEGRAM,
		// 	(await getWeatherStart(dateClear, members.locationsM)) ?? 'нет данных',
		// 	optionalOptions
		// );
		// await updateMessage(
		// 	messageIdPoll.reply_to_message.forward_from_message_id,
		// 	messageIdPoll,
		// 	messageIdWeather
		// );
	}
}
