import { handlerMainMenu } from '../keyboards/handler-main.js';

export async function callbackQuery(ctx) {
	const userName = ctx.update.callback_query.from.username;
	const cbqData = ctx.update.callback_query.data;

	// удаление меню инлайн клавиатуры после нажатия любой кнопки
	await ctx.deleteMessage(ctx.update.callback_query.message.message_id);

	handlerMainMenu(ctx, cbqData);
}
