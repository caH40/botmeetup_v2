import { Ticket } from '../../model/Ticket.js';

export async function buyTicket(ctx, period) {
	try {
		const periodClean = period.slice(7);
		const userId = ctx.update.callback_query.from.id;
		let durationInMilliseconds;
		let isUsedTestPeriod;
		const today = new Date().getTime();
		let testStr = '';

		if (periodClean === 'testWeek') {
			durationInMilliseconds = 1209600000;
			isUsedTestPeriod = true;
			testStr = '<b>тестовую</b> ';
		}

		if (periodClean === 'Month') {
			durationInMilliseconds = 2678400000;
		}
		if (periodClean === 'Year') {
			durationInMilliseconds = 31622400000;
		}

		const ticketDB = await Ticket.findOne({ ownerId: userId });
		//проверка на использование пробного периода
		if (ticketDB) {
			if (periodClean === 'testWeek' && ticketDB.isUsedTestPeriod) {
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
				purchase: [{ date: today, period: periodClean }],
			});
			await ticket.save();
		} else {
			durationInMilliseconds += ticketDB.duration;
			await Ticket.findOneAndUpdate(
				{ ownerId: userId },
				{
					$set: { duration: durationInMilliseconds, isUsedTestPeriod, isActive: true },
					$addToSet: { purchase: { date: today, period: periodClean } },
				}
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
