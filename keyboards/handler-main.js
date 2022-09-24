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

	async function getKeyboard(ctx, title, keyboard) {
		await ctx.reply(title, {
			reply_markup: { inline_keyboard: keyboard },
		});
	}
}
