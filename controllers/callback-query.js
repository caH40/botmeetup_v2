import { handlerMainMenu } from '../keyboards/handler-main.js';
import { handlerSubMenu } from '../keyboards/handler-sub.js';
import { handlerMainMenuLocation } from '../keyboards/location_start/handler-main.js';
import { handlerSubMenuLocation } from '../keyboards/location_start/handler-sub.js';
import { handlerMainMenuWeather } from '../keyboards/location_weather/handler-main.js';

export async function callbackQuery(ctx) {
	try {
		const messageForDel = ctx.session.messageDel;
		//если не был запущен rideon, то возврат
		if (!messageForDel)
			return await ctx.reply('Что то пошло не так, попробуйте заново запустить /rideon');

		messageForDel.forEach(messageId => {
			ctx.deleteMessage(messageId);
		});
		//обнуление массива сообщений для удаления
		ctx.session.messageDel = [];
		const cbqData = ctx.update.callback_query.data;
		// удаление меню инлайн клавиатуры после нажатия любой кнопки, исключение при выборе шаблонов поста
		if (
			!(
				cbqData.includes('postId_') ||
				cbqData.includes('_pattern_back') ||
				cbqData.includes('_edit_back')
			)
		) {
			await ctx.deleteMessage(ctx.update.callback_query.message.message_id);
		}

		//обработчики меню создания объявления о заезде(поста)
		await handlerMainMenu(ctx, cbqData);
		await handlerSubMenu(ctx, cbqData);
		//обработчики меню редактирования мест старта
		await handlerMainMenuLocation(ctx, cbqData);
		await handlerSubMenuLocation(ctx, cbqData);
		//обработчики меню редактирования мест погоды
		await handlerMainMenuWeather(ctx, cbqData);
	} catch (error) {
		console.log(error);
	}
}
