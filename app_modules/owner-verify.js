import { BotSetup } from '../model/BotSetup.js';

export async function ownerVerify(ctx) {
	try {
		// проверка проводится первой настройки бота из привязанной группы к каналу
		const userId = ctx.message.from.id;

		const botSetupDB = await BotSetup.findOne({ ownerId: userId });

		if (botSetupDB) return true;
		return false;
	} catch (error) {
		console.log(error);
	}
}
