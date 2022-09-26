import { WeatherWeek } from '../model/WeatherWeek.js';

import { formWeather } from '../app_modules/froms.js';

//!! делается запрос погоды из базы при каждой итерации(количество объявлений), необходимо это исправить

export async function getWeather(date, location) {
	try {
		const weatherDB = await WeatherWeek.findOne();

		let weatherCurrent = weatherDB.list.find(elm => elm.date == date && elm.city === location);
		weatherCurrent ??= [];
		weatherCurrent.desc ??= 'Предсказываю погоду на более близкие даты...';
		weatherCurrent.desc =
			weatherCurrent.desc.charAt(0).toUpperCase() + weatherCurrent.desc.slice(1);

		const formWeatherStr = formWeather(weatherCurrent);

		return { formWeatherStr, weatherCurrent };
	} catch {
		error => console.log(error);
	}
}
