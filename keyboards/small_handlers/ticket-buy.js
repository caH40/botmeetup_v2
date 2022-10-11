import { getInvoice } from '../../app_modules/invoice.js';

export async function buyTicket(ctx, period) {
	try {
		const periodClean = period.slice(7);
		const userId = ctx.update.callback_query.from.id;

		await ctx.replyWithInvoice(getInvoice(userId, periodClean));
	} catch (error) {
		console.log(error);
	}
}
