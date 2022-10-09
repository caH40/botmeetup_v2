// определение в какой канал постить объявление боту от пользователя. Бот постит в тот канал в котором пользователь состоит. Пользователю нельзя находится сразу в нескольких каналах в которых работает данный бот.
import { BotSetup } from '../model/BotSetup.js';

export async function chatsMember(ctx) {
	const userId = ctx.message.from.id;
	const botsSetupDB = await BotSetup.find();
	let chatMember;
	const members = [];

	for (let index = 0; index < botsSetupDB.length; index++) {
		chatMember = await ctx.telegram.getChatMember(botsSetupDB[index].channelId, userId);

		if (chatMember.status === 'member')
			members.push({
				channelId: botsSetupDB[index].channelId,
				botId: botsSetupDB[index]._id,
				isAdmin: false,
			});

		if (chatMember.status === 'creator' || chatMember.status === 'administrator')
			members.push({
				channelId: botsSetupDB[index].channelId,
				botId: botsSetupDB[index]._id,
				isAdmin: true,
			});
	}

	if (members.length == 0) {
		await ctx.reply(
			'Для выполнения команд необходимо состоять в соответствующем канале объявлений.'
		);
		return false;
	}

	if (members.length > 1) {
		await ctx.reply(
			'Вы состоите в нескольких каналах объявлений о велозаездах, где используется данный бот. К сожалению, бот может создавать объявление, когда пользователь состоит только в одном канале объявлений велозаездов.'
		);
		return false;
	}

	// обнуление сессии
	ctx.session = {};

	ctx.session.botId = members[0].botId;
	ctx.session.channelId = members[0].channelId;
	ctx.session.isAdmin = members[0].isAdmin;

	return true;
}
