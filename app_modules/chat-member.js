// определение в какой канал постить объявление боту от пользователя. Бот постит в тот канал в котором пользователь состоит. Пользователю нельзя находится сразу в нескольких каналах в которых работает данный бот.
import { BotSetup } from '../model/BotSetup.js';

export async function chatsMember(ctx) {
	const botsSetupDB = await BotSetup.find();
	let chatMember;
	const channels = [];

	for (let index = 0; index < botsSetupDB.length; index++) {
		chatMember = await ctx.telegram.getChatMember(botsSetupDB[index].channelId, userId);
		if (chatMember.status === 'member' || chatMember.status === 'creator')
			channels.push(botsSetupDB[index].channelId);
	}

	if (channels.length == 0) {
		await ctx.reply('Для публикации объявления необходимо состоять в соответствующем канале.');
		return false;
	}

	if (channels.length > 1) {
		await ctx.reply(
			'Вы состоите в нескольких каналах объявлений о велозаездах, где используется данный бот. К сожалению, бот может создавать объявление, когда пользователь состоит только в одном канале объявлений велозаездов.'
		);
		return false;
	}

	return channels[0];
}
