import { formFinalPost } from '../app_modules/froms.js';
import {
	getKeyboardDays,
	keyboardLocations,
	keyboardMeetingTimes,
	keyboardDistances,
	keyboardSpeed,
	keyboardDifficulty,
	keyboardSummary,
} from './keyboards.js';
import { sendFinalPost } from './sender.js';

export async function handlerMainMenu(ctx, cbqData) {
	try {
		// меню время
		if (cbqData === 'meetTime') {
			getKeyboard(ctx, 'Время старта', keyboardMeetingTimes);
		}
		// меню с датами выбираем
		if (cbqData === 'meetDate') {
			getKeyboard(ctx, 'Дата запланированного заезда', getKeyboardDays());
		}
		// меню места
		if (cbqData === 'meetLocation') {
			getKeyboard(ctx, 'Место старта', keyboardLocations);
		}
		// меню дистанций
		if (cbqData === 'meetDistance') {
			getKeyboard(ctx, 'Дистанция заезда', keyboardDistances);
		}
		// меню скорости
		if (cbqData === 'meetSpeed') {
			getKeyboard(ctx, 'Средняя скорость заезда, км/ч', keyboardSpeed);
		}
		// меню сложности
		if (cbqData === 'meetLevel') {
			getKeyboard(ctx, 'Уровень сложности заезда', keyboardDifficulty);
		}
		// меню загрузки картинки
		if (cbqData === 'meetCover') {
			await ctx.scene.enter('getPhoto');
		}
		// меню описания заезда
		if (cbqData === 'meetDescription') {
			await ctx.scene.enter('getDescription');
		}
		// вывод меню сводных данных по заезду, публикация или редактирование
		if (cbqData === 'meetSummary') {
			if (ctx.session.photoId) {
				await ctx.replyWithPhoto(ctx.session.photoId, {
					caption: formFinalPost(ctx),
					parse_mode: 'html',
					reply_markup: { inline_keyboard: keyboardSummary },
				});
			} else {
				await ctx.replyWithHTML(formFinalPost(ctx), {
					reply_markup: { inline_keyboard: keyboardSummary },
				});
			}
		}
	} catch (error) {
		console.log(error);
	}
	// отправка итогового объявления на канал объявлений
	if (cbqData === 'meetSend') {
		// проверка заполнения всех полей
		await sendFinalPost(ctx);
	}
}

async function getKeyboard(ctx, title, keyboard) {
	try {
		await ctx.reply(title, {
			reply_markup: { inline_keyboard: keyboard },
		});
	} catch (error) {
		console.log(error);
	}
}
