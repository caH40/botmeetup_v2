import { BotSetup } from '../model/BotSetup.js';
import { adminVerify } from '../app_modules/admin-verify.js';

//настройка бота для канала, данные сохраняются в БД
//определиться где добавляются города, из общего чата или из сессии сетап
export async function setup(ctx) {
	try {
		const botSetupDB = await BotSetup.findOne();

		const groupTitle = botSetupDB ? botSetupDB.groupTitle : '';
		// проверка должна осуществляться из данных DB
		const isAdmin = await adminVerify(ctx);
		if (!isAdmin)
			return await ctx.reply(
				`Команда доступна только из группы <b>${groupTitle}</b>, необходимо иметь права админа.`,
				{ parse_mode: 'html' }
			);

		const userId = ctx.message.from.id;
		// Если коллекция уже есть, то больше не создается. Может быть только одна коллекция BotSetup.
		if (!botSetupDB) {
			console.log('создаю документ botSetup');
			const newBotSetup = new BotSetup({ channelOwnerId: userId });
			await newBotSetup.save();
		}
		// Сцена для setup
		await ctx.scene.enter('setup');
	} catch (error) {
		console.log(error);
	}
}
