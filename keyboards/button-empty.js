//обработка пустой (дополнительной) клавиши "***"
import { getKeyboard } from './keyboard-get.js';
import { keyboardAddOrDel } from './keyboards.js';

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
