import { buyTicket } from '../small_handlers/ticket-buy.js';
import { ticketDescription } from '../small_handlers/ticket-description.js';

export async function handlerMainMenuTicket(ctx, cbqData) {
	try {
		if (!cbqData.includes('ticket_')) return;
		const messageId = ctx.update.callback_query.message.message_id;
		ctx.session.messageDel.push(messageId);
		if (cbqData === 'ticket_Month' || cbqData === 'ticket_Year' || cbqData === 'ticket_testWeek') {
			const period = cbqData;
			await buyTicket(ctx, period);
			return;
		}

		if (cbqData === 'ticket_description') {
			await ticketDescription(ctx);
			return;
		}
	} catch (error) {
		console.log(error);
	}
}
