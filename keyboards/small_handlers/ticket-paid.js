import { Ticket } from '../../model/Ticket.js';

export async function paidTicket(ctx, successfulPayment) {
	try {
		const ownerId = JSON.parse(successfulPayment.invoice_payload).unique_id;
		const amount = successfulPayment.total_amount / 100;
		const period = JSON.parse(successfulPayment.invoice_payload).period;
		const email = successfulPayment.order_info.email;

		let durationInMilliseconds;
		let isUsedTestPeriod;
		const today = new Date().getTime();
		let testStr = '';

		if (period === 'testWeek') {
			durationInMilliseconds = 1209600000;
			isUsedTestPeriod = true;
			testStr = '<b>тестовую</b> ';
		}

		if (period === 'Month') {
			durationInMilliseconds = 2678400000;
		}
		if (period === 'Year') {
			durationInMilliseconds = 31622400000;
		}

		const ticketDB = await Ticket.findOne({ ownerId });
		//проверка на использование пробного периода
		if (ticketDB) {
			if (period === 'testWeek' && ticketDB.isUsedTestPeriod) {
				return await ctx.reply(`Вы уже использовали пробный период для BotMeetUp`, {
					parse_mode: 'html',
				});
			}
		}

		if (!ticketDB) {
			const ticket = new Ticket({
				ownerId: ownerId,
				datePurchase: today,
				duration: durationInMilliseconds,
				isActive: true,
				isUsedTestPeriod,
				purchase: [{ date: today, period, amount, email }],
			});
			await ticket.save();
		} else {
			durationInMilliseconds += ticketDB.duration;
			await Ticket.findOneAndUpdate(
				{ ownerId: ownerId },
				{
					$set: { duration: durationInMilliseconds, isUsedTestPeriod, isActive: true },
					$addToSet: { purchase: { date: today, period, amount, email } },
				}
			);
		}

		const lastValidDay = new Date(today + durationInMilliseconds).toLocaleDateString();
		await ctx.reply(
			`Вы приобрели ${testStr}подписку на BotMeetUp. Период использования бота заканчивается <b>${lastValidDay}</b>`,
			{ parse_mode: 'html' }
		);
	} catch (error) {
		console.log(error);
	}
}
