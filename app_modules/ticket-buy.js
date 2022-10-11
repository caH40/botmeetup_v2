import { Ticket } from '../model/Ticket.js';

export async function buyTicket(ctx, period) {
	try {
		const userId = ctx.update.callback_query.from.id;
		let durationInMilliseconds;
		let isUsedTestPeriod;
		const today = new Date().getTime();
		let testStr = '';

		if (period.includes('Week')) {
			durationInMilliseconds = 1209600000;
			isUsedTestPeriod = true;
			testStr = '<b>тестовую</b> ';
		}

		if (period.includes('Month')) {
			durationInMilliseconds = 2678400000;
		}
		if (period.includes('Year')) {
			durationInMilliseconds = 31622400000;
		}

		const ticketDB = await Ticket.findOne({ ownerId: userId });
		//проверка на использование пробного периода
		if (ticketDB) {
			if (period.includes('Week') && ticketDB.isUsedTestPeriod) {
				return await ctx.reply(`Вы уже использовали пробный период для BotMeetUp`, {
					parse_mode: 'html',
				});
			}
		}

		if (!ticketDB) {
			const ticket = new Ticket({
				ownerId: userId,
				datePurchase: today,
				duration: durationInMilliseconds,
				isActive: true,
				isUsedTestPeriod,
			});
			await ticket.save();
		} else {
			durationInMilliseconds += ticketDB.duration;
			await Ticket.findOneAndUpdate(
				{ ownerId: userId },
				{ $set: { duration: durationInMilliseconds, isUsedTestPeriod } }
			);
		}

		const lastValidDay = new Date(today + durationInMilliseconds).toLocaleString();
		await ctx.reply(
			`Вы приобрели ${testStr}подписку на BotMeetUp, она действительна до ${lastValidDay}`,
			{ parse_mode: 'html' }
		);
	} catch (error) {
		console.log(error);
	}
}
