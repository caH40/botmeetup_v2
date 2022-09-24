import {
	keyboardMain,
	getKeyboardDays,
	keyboardLocations,
	keyboardMeetingTimes,
	keyboardDistances,
	keyboardSpeed,
	keyboardDifficulty,
	keyboardSummary,
	keyboardBack,
	getKeyboardForDelPost,
} from './keyboards.js';

export async function handlerMainMenu(ctx, cbqData) {
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
}

async function getKeyboard(ctx, title, keyboard) {
	await ctx.reply(title, {
		reply_markup: { inline_keyboard: keyboard },
	});
}
