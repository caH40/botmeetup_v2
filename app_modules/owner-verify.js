import { BotSetup } from '../model/BotSetup.js';

export async function ownerVerify(ctx) {
	try {
		const userId = ctx.message.from.id;

		const botSetupDB = await BotSetup.findOne();
		if (!botSetupDB) return console.log('Нет данных по owner в коллекции BotSetup в БД');

		if (botSetupDB.channelOwnerId == userId) return true;
	} catch (error) {
		console.log(error);
	}
}
