import { handlerMainMenu } from '../keyboards/handler-main.js';
import { handlerSubMenu } from '../keyboards/handler-sub.js';
import { handlerMainMenuLocation } from '../keyboards/location_start/handler-main.js';
import { handlerSubMenuLocation } from '../keyboards/location_start/handler-sub.js';
import { handlerMainMenuWeather } from '../keyboards/location_weather/handler-main.js';
import { handlerSubMenuWeather } from '../keyboards/location_weather/handler-sub.js';

export async function callbackQuery(ctx) {
	try {
		const cbqData = ctx.update.callback_query.data;

		// удаление меню инлайн клавиатуры после нажатия любой кнопки
		await ctx.deleteMessage(ctx.update.callback_query.message.message_id);
		//обработчики меню создания объявления о заезде(поста)
		await handlerMainMenu(ctx, cbqData);
		await handlerSubMenu(ctx, cbqData);
		//обработчики меню редактирования мест старта
		await handlerMainMenuLocation(ctx, cbqData);
		await handlerSubMenuLocation(ctx, cbqData);
		//обработчики меню редактирования мест погоды
		await handlerMainMenuWeather(ctx, cbqData);
		await handlerSubMenuWeather(ctx, cbqData);
	} catch (error) {
		console.log(error);
	}
}
