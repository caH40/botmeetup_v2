import { handlerMainMenu } from '../keyboards/handler-main.js';

export async function callbackQuery(ctx) {
	const userName = ctx.update.callback_query.from.username;
	const cbqData = ctx.update.callback_query.data;

	console.log(cbqData); //for dev

	handlerMainMenu(ctx, cbqData);
}
