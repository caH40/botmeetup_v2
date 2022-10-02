//обработка пустой (дополнительной) клавиши "***"
import { getKeyboard } from './keyboard-get.js';
import { keyboardAddOrDel, keyboardLocation } from './keyboards.js';
import { Location } from '../model/Location.js';

export default {
	async locationStart(ctx, cbqData) {
		// если приходит callback_data '***' то return
		await getKeyboard(
			ctx,
			'Это была пустая кнопка, а не место старта. Выберите действие:',
			keyboardAddOrDel()
		);
	},

	async locationWeather(ctx, cbqData) {
		const locationsDB = await Location.find();
		await getKeyboard(
			ctx,
			'Это была пустая кнопка, а не место старта.\nВыберите место старта для редактирования его массива мест мониторинга погоды:',
			keyboardLocation(locationsDB, 'locationStart_')
		);
	},
};
