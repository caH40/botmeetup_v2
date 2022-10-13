import { handlerMainMenu } from '../keyboards/handler-main.js';
import { handlerSubMenu } from '../keyboards/handler-sub.js';
import { handlerMainMenuTicket } from '../keyboards/ticket/handler-main.js';

export async function callbackQuery(ctx) {
	try {
		const messageForDel = ctx.session.messageDel;
		if (!messageForDel) return await ctx.reply('Что то пошло не так...');

		messageForDel.forEach(async messageId => {
			await ctx
				.deleteMessage(messageId)
				.catch(error =>
					console.log(
						new Date().toLocaleString(),
						'ошибка пру удалении сообщения',
						'module - callback-query.js'
					)
				);
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

		await handlerMainMenuTicket(ctx, cbqData);
	} catch (error) {
		console.log(error);
	}
}
