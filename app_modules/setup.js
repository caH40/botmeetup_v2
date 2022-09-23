import { BotSetup } from '../model/BotSetup.js';
import { adminVerify } from './admin-verify.js';

//настройка бота для канала, данные сохраняются в БД
//определиться где добавляются города, из общего чата или из сессии сетап
export async function setup(ctx) {
	try {
		const botSetupDB = await BotSetup.findOne();

		const chatName = botSetupDB ? botSetupDB.groupTitle : '';
		// проверка должна осуществляться из данных DB
		const isAdmin = await adminVerify(ctx);
		if (!isAdmin) return await ctx.reply(`Команда доступна админам и только из группы ${chatName}`);

		const userId = ctx.message.from.id;
		// Если коллекция уже есть, то больше не создается. Может быть только одна коллекция BotSetup.
		if (!botSetupDB) {
			console.log('создаю документ botSetup');
			const newBotSetup = new BotSetup({ channelOwnerId: userId });
			await newBotSetup.save();
		}
		await ctx.scene.enter('setup');
	} catch (error) {
		console.log(error);
	}
}
