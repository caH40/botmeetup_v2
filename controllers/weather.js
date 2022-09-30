import { getKeyboard } from '../keyboards/keyboard-get.js';
import { keyboardLocation } from '../keyboards/keyboards.js';
import { Location } from '../model/Location.js';

export async function editLocationsWeather(ctx) {
	try {
		const locationsDB = await Location.find();
		await getKeyboard(
			ctx,
			'Выберите место старта для редактирования его массива мест мониторинга погоды:',
			keyboardLocation(locationsDB, 'locationStart_')
		);
	} catch (error) {
		console.log(error);
	}
}
