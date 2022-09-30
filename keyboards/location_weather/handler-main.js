// 🌞
import { cityList } from '../../weather/city-mylist.js';
import { Location } from '../../model/Location.js';
import { getKeyboard } from '../keyboard-get.js';
import { keyboardLocation, keyboardAddOrDel } from '../keyboards.js';
import { emptyButtonWeather } from '../empty.js';

export async function handlerMainMenuWeather(ctx, cbqData) {
	if (cbqData.includes('***')) {
		await emptyButtonWeather(ctx, cbqData);
		return;
	}

	if (cbqData.includes('locationStart_')) {
		const locationStart = cbqData.slice(14);
		ctx.session.locationStart = locationStart;

		const locationsWeather = await Location.findOne({ name: locationStart });

		await getKeyboard(
			ctx,
			`Выберите действие для места старта - <b>${locationStart}</b>\nУже мониторятся: <b>${locationsWeather.weather}</b>`,
			keyboardAddOrDel('standard', 'Weather')
		);
	}

	if (cbqData.includes('addLocationWeather')) {
		const locationStart = ctx.session.locationStart;
		// сделать отработку ошибки если не находит документ
		const { weather } = await Location.findOne({ name: locationStart });

		// убираются города из клавиатуры которые есть текущем документе location
		const filteredWeather = cityList.filter(city => !weather.includes(city.name));

		if (filteredWeather.length == 0) {
			await ctx.reply(
				'Вы добавили все имеющиеся места погоды в настройки бота. Больше нечего добавлять.'
			);
			await getKeyboard(ctx, 'Выберите действие:', keyboardAddOrDel('remove'));
			return;
		}

		const title = 'Выберите место погоды для мониторинга';
		getKeyboard(ctx, title, keyboardLocation(filteredWeather, 'locationsWeather_'));
	}

	if (cbqData.includes('locationsWeather_')) {
		const locationWeather = cbqData.slice(17);

		const locationStart = ctx.session.locationStart;
		const response = await Location.findOneAndUpdate(
			{ name: locationStart },
			{ $addToSet: { weather: locationWeather } }
		);

		const locationsWeather = await Location.findOne({ name: locationStart });

		await getKeyboard(
			ctx,
			`Выберите действие для места старта - <b>${locationStart}</b>\nУже мониторятся: <b>${locationsWeather.weather}</b>`,
			keyboardAddOrDel('standard', 'Weather')
		);
	}
}
