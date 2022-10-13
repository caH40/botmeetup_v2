import { City } from '../../model/City.js';
import { getKeyboard } from '../keyboard-get.js';
import { keyboardBack, keyboardLocation } from '../keyboards.js';

export async function meetWeather_v2(ctx) {
	try {
		const locationStart = ctx.session.locationStart;
		const text = ctx.message.text;
		// обнуление значение погоды в сессии
		ctx.session.locationWeather = '---';
		ctx.session.start[1][1].text = 'Погода';

		const cities = [];
		const citiesDB = await City.find({ name: { $regex: text } });

		for (let index = 0; index < citiesDB.length; index++) {
			cities.push(citiesDB[index]);
		}

		if (cities.length > 20)
			return await ctx.reply(
				'Нашлось слишком много вариантов, сузьте поиск города, увеличьте количество букв. Для выхода /quit'
			);
		if (cities.length === 0)
			return await ctx.reply(
				`Ничего не нашлось.\nВвод необходимо осуществлять на латинице начиная с заглавной буквы. Для выхода /quit`
			);

		getKeyboard(
			ctx,
			`Выберите нужный город для наблюдения за погодой при старте из <b>${locationStart}</b>`,
			keyboardLocation(cities, 'weather_')
		);
	} catch (error) {
		console.log(error);
	}
}
