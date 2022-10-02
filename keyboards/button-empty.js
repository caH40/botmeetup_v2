//обработка пустой (дополнительной) клавиши "***"
import { getKeyboard } from './keyboard-get.js';
import {
	keyboardAddOrDel,
	keyboardMainLocations,
	keyboardLocation,
	keyboardLocationsWeather,
} from './keyboards.js';
import { Location } from '../model/Location.js';

export default {
	async locationStart(ctx, cbqData) {
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

	async meetLocation(ctx, cbqData) {
		const locationsDB = await Location.find();
		await getKeyboard(
			ctx,
			'Это была пустая кнопка, а не место старта.\nВыберите место старта:',
			keyboardMainLocations(locationsDB)
		);
	},

	async meetWeather(ctx, cbqData) {
		const locationStart = ctx.session.locationStart;
		const { weather } = await Location.findOne({ name: ctx.session.locationStart });
		console.log(locationStart, weather);
		await getKeyboard(
			ctx,
			'Это была пустая кнопка, а не место погоды.\nВыберите место погоды:',
			keyboardLocationsWeather(weather, 'weather_')
		);
	},
};
