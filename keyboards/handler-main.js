import { formFinalPost } from '../app_modules/forms.js';
import { getKeyboard } from './keyboard-get.js';
import {
	getKeyboardDays,
	keyboardMainLocations,
	keyboardMeetingTimes,
	keyboardDistances,
	keyboardSpeed,
	keyboardDifficulty,
	keyboardSummary,
} from './keyboards.js';
import { sendFinalPost } from '../app_modules/sender.js';
import { BotSetup } from '../model/BotSetup.js';
import { Location } from '../model/Location.js';
import { meetWeather } from './small_handlers/meet-weather.js';

export async function handlerMainMenu(ctx, cbqData) {
	try {
		console.log(cbqData);
		// console.log('ctx.session', ctx.session); //!!!! for dev

		// меню время
		if (cbqData === 'meetTime') await getKeyboard(ctx, 'Время старта', keyboardMeetingTimes);

		// меню с датами выбираем
		if (cbqData === 'meetDate')
			await getKeyboard(ctx, 'Дата запланированного заезда', getKeyboardDays());

		// меню места
		if (cbqData === 'meetLocation') {
			// обнуление значение погоды в сессии
			ctx.session.locationWeather = '';
			ctx.session.start[2][1].text = 'Погода';

			const locationsDB = await Location.find();
			getKeyboard(ctx, 'Место старта', keyboardMainLocations(locationsDB));
		}
		// меню дистанций
		if (cbqData === 'meetDistance') await getKeyboard(ctx, 'Дистанция заезда', keyboardDistances);

		// меню скорости
		if (cbqData === 'meetSpeed')
			await getKeyboard(ctx, 'Средняя скорость заезда, км/ч', keyboardSpeed);

		// меню погода
		if (cbqData === 'meetWeather') await meetWeather(ctx, cbqData);

		// // меню сложности
		// if (cbqData === 'meetLevel') {
		// 	getKeyboard(ctx, 'Уровень сложности заезда', keyboardDifficulty);
		// }
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
	} catch (error) {
		console.log(error);
	}
	// отправка итогового объявления на канал объявлений
	if (cbqData === 'meetSend') {
		// проверка заполнения всех полей
		await sendFinalPost(ctx);
	}
}
