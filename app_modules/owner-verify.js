import { BotSetup } from '../model/BotSetup.js';

export async function ownerVerify(ctx) {
	try {
		let isOwner = false;
		const userId = ctx.message.from.id;

		const botSetupDB = await BotSetup.findOne({ ownerId: userId });
		if (!botSetupDB) {
			await ctx.reply('У вас нет Бота для настройки мест старта');
			return isOwner;
		}

		isOwner = true;

		return isOwner;
	} catch (error) {
		console.log(error);
	}
}
