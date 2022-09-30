//обработка пустой (дополнительной) клавиши "***"
import { getKeyboard } from './keyboard-get.js';
import { keyboardAddOrDel } from './keyboards.js';

export async function emptyButton(ctx, cbqData) {
	// если приходит callback_data '***' то return
	await getKeyboard(
		ctx,
		'Это была пустая кнопка, а не город. Выберите действие:',
		keyboardAddOrDel
	);
}
