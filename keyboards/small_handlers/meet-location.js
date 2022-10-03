import { Location } from '../../model/Location.js';
import { getKeyboard } from '../keyboard-get.js';
import { keyboardMainLocations } from '../keyboards.js';

export async function meetLocations(ctx, cbqData) {
	try {
		// обнуление значение погоды в сессии
		ctx.session.locationWeather = '---';
		ctx.session.start[1][1].text = 'Погода';
		const locationsDB = await Location.find();
		if (locationsDB.length == 0)
			return ctx.reply(
				'Нет данных! Первоначально необходимо выполнить настройку бота, добавив "места старта" командой /location. Затем, если необходимо, добавить "места погоды" каждому "месту старта" для мониторинга погоды /weather'
			);
		getKeyboard(ctx, 'Место старта', keyboardMainLocations(locationsDB));
	} catch (error) {
		console.log(error);
	}
}
