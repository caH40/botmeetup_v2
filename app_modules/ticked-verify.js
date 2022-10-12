import { Ticket } from '../model/Ticket.js';

export async function ticketVerify(ctx) {
	const ticketDB = await Ticket.findOne({ botId: ctx.session.botId });
	if (!ticketDB) {
		await ctx.reply(
			`В БД нет тикета бота для канала <b>@${ctx.session.channelName}</b>.\nВладельцу канала необходимо приобрести тикет или воспользоваться тестовым периодом.\nЗапустите команду /ticket`,
			{ parse_mode: 'html' }
		);
		return false;
	}

	if (ticketDB.isActive === false) {
		ctx.reply(
			`К сожалению, у бота закончился оплаченный период для канала <b>@${ctx.session.channelName}</b>`,
			{
				parse_mode: 'html',
			}
		);
		return false;
	}
	return true;
}
