import { Location } from '../../model/Location.js';
import { getKeyboard } from '../keyboard-get.js';
import { keyboardMainLocations } from '../keyboards.js';

export async function meetLocations(ctx, cbqData) {
	// обнуление значение погоды в сессии
	ctx.session.locationWeather = '';
	ctx.session.start[2][1].text = 'Погода';
	const locationsDB = await Location.find();
	getKeyboard(ctx, 'Место старта', keyboardMainLocations(locationsDB));
}
