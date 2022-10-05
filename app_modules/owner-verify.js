import { BotSetup } from '../model/BotSetup.js';

export async function ownerVerify(ctx) {
	try {
		let isOwner = false;
		const userId = ctx.message.from.id;

		const botSetupDB = await BotSetup.findOne();
		if (!botSetupDB)
			return await ctx.reply(
				'Необходимо запустить команду /update в канале, к которому привязана дискуссионная группа.'
			);

		if (botSetupDB.channelOwnerId == userId) isOwner = true;
		return isOwner;
	} catch (error) {
		console.log(error);
	}
}
