//обработка пустой (дополнительной) клавиши "***"
import { getKeyboard } from './keyboard-get.js';
import { keyboardAddOrDel, keyboardLocation, keyboardWeathers } from './keyboards.js';
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

	async meetLocation(ctx) {
		try {
			await ctx.reply('Это была пустая кнопка, а не место старта.');
			ctx.scene.enter('city');
		} catch (error) {
			console.log(error);
		}
	},

	async meetWeather(ctx) {
		try {
			try {
				await ctx.reply('Это была пустая кнопка, а не место старта.');
				ctx.scene.enter('weather');
			} catch (error) {
				console.log(error);
			}
		} catch (error) {
			console.log(error);
		}
	},
};
