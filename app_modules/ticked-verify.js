import { Ticket } from '../model/Ticket.js';

export async function ticketVerify(ctx) {
	const tickedDB = await Ticket.findOne({ botId: ctx.session.botId });
	if (tickedDB.isActive === false) {
		ctx.reply('К сожалению, у данного бота закончился оплаченный период!');
		return false;
	}
	return true;
}
