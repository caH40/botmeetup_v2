import { getKeyboard } from '../keyboards/keyboard-get.js';
import { keyboardAddOrDel } from '../keyboards/keyboards.js';
//This is a scene for editing an array of cities
export async function editLocationsWeather(ctx) {
	try {
		await getKeyboard(
			ctx,
			'Редактирование массива мест старта. Выберите действие:',
			keyboardAddOrDel()
		);
	} catch (error) {
		console.log(error);
	}
}
