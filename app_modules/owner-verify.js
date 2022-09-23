import { BotSetup } from '../model/BotSetup.js';

export async function ownerVerify(ctx) {
	try {
		const userId = ctx.message.from.id;

		const botSetup = await BotSetup.findOne({ channelOwnerId: userId });

		let isOwner = false;
		admins.forEach(member => {
			if (member.user.id === userId) {
				isOwner = true;
			}
		});

		return isOwner;
	} catch (error) {
		console.log(error);
	}
}
