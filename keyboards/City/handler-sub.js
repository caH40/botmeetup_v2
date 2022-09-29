import { BotSetup } from '../../model/BotSetup.js';
import { getKeyboard } from '../keyboard-get.js';
import { keyboardAddOrDel } from '../keyboards.js';

export async function handlerSubCityMenu(ctx, cbqData) {
	//не выполнять ниже стоящий код, если нет нужных ключевых слов
	if (!(cbqData.includes('addNewLocation_') || cbqData.includes('deleteNewLocation_'))) return;
	// если приходит callback_data '***' то return
	if (cbqData.includes('***')) {
		await getKeyboard(
			ctx,
			'Это была пустая кнопка, а не город. Выберите действие:',
			keyboardAddOrDel
		);
		return;
	}

	if (cbqData.includes('addNewLocation_')) {
		const city = cbqData.slice(15);
		await BotSetup.findOneAndUpdate({ $addToSet: { city: { name: city } } });
		const title = `Город <b>${city}</b> был добавлен. Выберите действие:`;
		await getKeyboard(ctx, title, keyboardAddOrDel);
	}

	if (cbqData.includes('deleteNewLocation_')) {
		const city = cbqData.slice(18);
		await BotSetup.findOneAndUpdate({ $pull: { city: { name: city } } });
		const title = `Город <b>${city}</b> был удален. Выберите действие:`;
		await getKeyboard(ctx, title, keyboardAddOrDel);
	}
}
