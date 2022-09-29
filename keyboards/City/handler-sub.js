import { BotSetup } from '../../model/BotSetup.js';
import { getKeyboard } from '../keyboard-get.js';
import { keyboardNewLocation, keyboardCityAbsent, keyboardAddOrDel } from '../keyboards.js';

export async function handlerSubCityMenu(ctx, cbqData) {
	//не выполнять ниже стоящий код, если нет нужных ключевых слов
	if (!cbqData.includes('addNewLocation_')) return;

	if (cbqData.includes('addNewLocation_')) {
		const city = cbqData.slice(15);
		await BotSetup.findOneAndUpdate({ $addToSet: { city } });
		await getKeyboard(ctx, 'Редактирование массива городов. Выберите действие:', keyboardAddOrDel);
	}
}
