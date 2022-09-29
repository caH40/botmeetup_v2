import { handlerMainMenu } from '../keyboards/handler-main.js';
import { handlerSubMenu } from '../keyboards/handler-sub.js';
import { handlerCityMenu } from '../keyboards/handler-city.js';

export async function callbackQuery(ctx) {
	try {
		const cbqData = ctx.update.callback_query.data;

		// удаление меню инлайн клавиатуры после нажатия любой кнопки
		await ctx.deleteMessage(ctx.update.callback_query.message.message_id);

		await handlerMainMenu(ctx, cbqData);
		await handlerSubMenu(ctx, cbqData);

		await handlerCityMenu(ctx, cbqData);
	} catch (error) {
		console.log(error);
	}
}
