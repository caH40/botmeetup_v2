import { formFinalPost } from '../app_modules/forms.js';
import { getKeyboard } from './keyboard-get.js';
import {
	getKeyboardDays,
	keyboardMeetingTimes,
	keyboardDistances,
	keyboardSpeed,
	keyboardSummary,
} from './keyboards.js';
import { sendFinalPost } from '../app_modules/sender.js';
import { meetWeather } from './small_handlers/meet-weather.js';
import { meetLocations } from './small_handlers/meet-location.js';
import { patternPost } from './small_handlers/pattern.js';
import { meetLocations_v2 } from './small_handlers/meet-location_v2.js';

export async function handlerMainMenu(ctx, cbqData) {
	try {
		// меню время
		if (cbqData === 'meetTime') await getKeyboard(ctx, 'Время старта', keyboardMeetingTimes());

		// меню с датами выбираем
		if (cbqData === 'meetDate')
			await getKeyboard(ctx, 'Дата запланированного заезда', getKeyboardDays());

		// меню места
		if (cbqData === 'meetLocation') await ctx.scene.enter('city');
		// меню погода
		if (cbqData === 'meetWeather') await ctx.scene.enter('weather');
		// меню дистанций
		if (cbqData === 'meetDistance') await getKeyboard(ctx, 'Дистанция заезда', keyboardDistances());
		// меню скорости
		if (cbqData === 'meetSpeed')
			await getKeyboard(ctx, 'Средняя скорость заезда, км/ч', keyboardSpeed);
		// меню загрузки картинки
		if (cbqData === 'meetCover') await ctx.scene.enter('getPhoto');

		// меню описания заезда
		if (cbqData === 'meetDescription') await ctx.scene.enter('getDescription');

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
		if (cbqData === 'meetPattern') await patternPost(ctx, cbqData);
		// отправка итогового объявления на канал объявлений
		if (cbqData === 'meetSend') {
			// проверка заполнения всех полей
			await sendFinalPost(ctx);
		}
	} catch (error) {
		console.log(error);
	}
}
