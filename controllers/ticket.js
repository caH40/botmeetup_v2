import { Ticket } from '../model/Ticket.js';

export async function ticket(ctx) {
	try {
		// console.log(ctx.message); // ❗❗❗ for dev
		const userId = ctx.message.from.id;
		//for testing
		const millisecondsInOneDay = 86400000;
		const today = new Date().getTime();
		const ticket = new Ticket({
			ownerId: userId,
			datePurchase: today,
			duration: millisecondsInOneDay,
			isActive: true,
		});
		const response = await ticket.save();

		const lastValidDay = new Date(today + millisecondsInOneDay).toLocaleString();
		await ctx.reply('Вы приобрели подписку на BotMeetUp, она действительна до ' + lastValidDay);
	} catch (error) {
		console.log(error);
	}
}
