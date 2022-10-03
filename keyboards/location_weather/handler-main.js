// 🌞
import { cityList } from '../../weather/city-mylist.js';
import { Location } from '../../model/Location.js';
import { getKeyboard } from '../keyboard-get.js';
import { keyboardLocation, keyboardAddOrDel, keyboardWeatherRemove } from '../keyboards.js';
import buttonEmpty from '../button-empty.js';
import { weatherFromApi } from '../../weather/weather-api.js';

export async function handlerMainMenuWeather(ctx, cbqData) {
	if (cbqData.includes('locationStart_***')) {
		await buttonEmpty.locationStartWeather(ctx, cbqData);
		return;
	}
	if (cbqData.includes('weatherForAdd_***')) {
		await buttonEmpty.locationWeather(ctx, cbqData);
		return;
	}

	if (cbqData.includes('locationStart_')) {
		const locationStart = cbqData.slice(14);
		ctx.session.locationStart = locationStart;

		const locationsWeather = await Location.findOne({ name: locationStart });
		if (!locationsWeather) return console.log(`Не найдено место name: "${locationStart}" в БД`);

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

		const title = `Выберите место погоды для старта из <b>${locationStart}</b>`;
		getKeyboard(ctx, title, keyboardLocation(filteredWeather, 'weatherForAdd_'));
	}

	if (cbqData.includes('removeLocationWeather')) {
		const locationStart = ctx.session.locationStart;
		// сделать отработку ошибки если не находит документ
		const { weather } = await Location.findOne({ name: locationStart });

		const title = 'Выберите место погоды для удаления из массива:';
		if (weather.length == 0) {
			return await ctx.reply(`Не мест погоды у <b>${locationStart}</b> для удаления!`, {
				parse_mode: 'html',
			});
		}
		getKeyboard(ctx, title, keyboardWeatherRemove(weather, 'weatherForRemove_'));
	}

	if (cbqData.includes('weatherForAdd_')) {
		const locationWeather = cbqData.slice(14);

		const locationStart = ctx.session.locationStart;
		const response = await Location.findOneAndUpdate(
			{ name: locationStart },
			{ $addToSet: { weather: locationWeather } },
			{ returnDocument: 'after' }
		);
		// после каждого добавления "места погоды" запрашивается прогноз погоды с сервера погоды и обновляются данные в ДБ weatherWeek
		await weatherFromApi();

		await getKeyboard(
			ctx,
			`Выберите действие для места старта - <b>${locationStart}</b>\nУже мониторятся: <b>${response.weather}</b>`,
			keyboardAddOrDel('standard', 'Weather')
		);
	}

	if (cbqData.includes('weatherForRemove_')) {
		const locationWeather = cbqData.slice(17);
		const locationStart = ctx.session.locationStart;

		const response = await Location.findOneAndUpdate(
			{ name: locationStart },
			{ $pull: { weather: locationWeather } },
			{ returnDocument: 'after' }
		);

		await getKeyboard(
			ctx,
			`Выберите действие для места старта - <b>${locationStart}</b>\nУже мониторятся: <b>${response.weather}</b>`,
			keyboardAddOrDel('standard', 'Weather')
		);
	}
}
