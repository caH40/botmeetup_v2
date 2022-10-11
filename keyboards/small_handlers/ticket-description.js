import { Ticket } from '../../model/Ticket.js';

export async function ticketDescription(ctx) {
	try {
		const userId = ctx.update.callback_query.from.id;
		let finalStr = '';

		const ticketDB = await Ticket.findOne({ ownerId: userId });
		if (ticketDB) {
			const lastValidDay = new Date(ticketDB.datePurchase + ticketDB.duration).toLocaleString();
			finalStr = ticketDB.isActive
				? `Ваш период использования бота заканчивается ${lastValidDay}`
				: `Ваш период использования бота закончился ${lastValidDay}`;
		}

		await ctx.reply(
			`Для использования бот BotMeetUp на своем канале необходимо приобрести подписку:\n-пробный период 2 недели;\n-месяц за 300 рублей;\n-год за 3000 рублей.\n${finalStr}`
		);
	} catch (error) {
		console.log(error);
	}
}
