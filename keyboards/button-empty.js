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
		try {
			await getKeyboard(
				ctx,
				'Это была пустая кнопка, а не место старта. Выберите действие:',
				keyboardAddOrDel()
			);
		} catch (error) {
			console.log(error);
		}
	},

	async locationStartWeather(ctx, cbqData) {
		try {
			const locationsDB = await Location.find();
			await getKeyboard(
				ctx,
				'Это была пустая кнопка, а не место старта. Выберите место старта для редактирования его массива мест мониторинга погоды:',
				keyboardLocation(locationsDB, 'locationStart_')
			);
		} catch (error) {
			console.log(error);
		}
	},

	async locationWeather(ctx, cbqData) {
		try {
			const locationsDB = await Location.find();
			await getKeyboard(
				ctx,
				'Это была пустая кнопка, а не место старта.\nВыберите место старта для редактирования его массива мест мониторинга погоды:',
				keyboardLocation(locationsDB, 'locationStart_')
			);
		} catch (error) {
			console.log(error);
		}
	},

	async meetLocation(ctx, cbqData) {
		try {
			const locationsDB = await Location.find();
			await getKeyboard(
				ctx,
				'Это была пустая кнопка, а не место старта.\nВыберите место старта:',
				keyboardMainLocations(locationsDB)
			);
		} catch (error) {
			console.log(error);
		}
	},

	async meetWeather(ctx, cbqData) {
		try {
			const locationStart = ctx.session.locationStart;
			const { weather } = await Location.findOne({ name: ctx.session.locationStart });
			console.log(locationStart, weather);
			await getKeyboard(
				ctx,
				'Это была пустая кнопка, а не место погоды.\nВыберите место погоды:',
				keyboardLocationsWeather(weather, 'weather_')
			);
		} catch (error) {
			console.log(error);
		}
	},
};
