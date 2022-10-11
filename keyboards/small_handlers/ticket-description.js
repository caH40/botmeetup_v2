import { Ticket } from '../../model/Ticket.js';

export async function ticketDescription(ctx) {
	try {
		const userId = ctx.update.callback_query.from.id;
		let finalStr = '';

		const ticketDB = await Ticket.findOne({ ownerId: userId });
		if (ticketDB) {
			const lastValidDay = new Date(ticketDB.datePurchase + ticketDB.duration).toLocaleDateString();
			finalStr = ticketDB.isActive
				? `Ваш период использования бота заканчивается <b>${lastValidDay}</b>`
				: `Ваш период использования бота закончился <b>${lastValidDay}</b>`;
		}

		await ctx.reply(
			`Для использования бота BotMeetUp на своем канале необходимо приобрести подписку:\n-пробный период 2 недели;\n-месяц за 300 рублей;\n-год за 3000 рублей.\n==============================\n${finalStr}`,
			{ parse_mode: 'html' }
		);
	} catch (error) {
		console.log(error);
	}
}
