import { BotSetup } from '../../model/BotSetup.js';
import { emptyButton } from '../empty.js';
import { getKeyboard } from '../keyboard-get.js';
import { keyboardAddOrDel } from '../keyboards.js';

export async function handlerSubMenuLocation(ctx, cbqData) {
	//не выполнять ниже стоящий код, если нет нужных ключевых слов
	await emptyButton(ctx, cbqData);
	if (!(cbqData.includes('addLocationNew_') || cbqData.includes('removeLocationNew_'))) return;
	await emptyButton(ctx, cbqData);

	if (cbqData.includes('addLocationNew_')) {
		const city = cbqData.slice(15);
		await BotSetup.findOneAndUpdate({ $addToSet: { city: { name: city } } });
		const title = `Город <b>${city}</b> был добавлен. Выберите действие:`;
		await getKeyboard(ctx, title, keyboardAddOrDel);
	}

	if (cbqData.includes('removeLocationNew_')) {
		const city = cbqData.slice(18);
		await BotSetup.findOneAndUpdate({ $pull: { city: { name: city } } });
		const title = `Город <b>${city}</b> был удален. Выберите действие:`;
		await getKeyboard(ctx, title, keyboardAddOrDel);
	}
}
