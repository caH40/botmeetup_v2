import { buyTicket } from '../../app_modules/ticket-buy.js';

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

		if (cbqData === 'ticket_description') return;
	} catch (error) {
		console.log(error);
	}
}
