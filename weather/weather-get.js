import { WeatherWeek } from '../model/WeatherWeek.js';

import { formWeather } from '../app_modules/forms.js';

//!! делается запрос погоды из базы при каждой итерации(количество объявлений), необходимо это исправить

export async function getWeather(date, location) {
	try {
		const weatherDB = await WeatherWeek.findOne();

		if (!weatherDB) return;

		let weatherCurrent = weatherDB.list.find(elm => elm.date == date && elm.city === location);
		weatherCurrent ??= [];
		weatherCurrent.desc ??= 'Предсказываю погоду на более близкие даты...';
		weatherCurrent.desc =
			weatherCurrent.desc.charAt(0).toUpperCase() + weatherCurrent.desc.slice(1);

		//формирование строки для сообщения в телеге
		const formWeatherStr = formWeather(weatherCurrent);

		return { formWeatherStr, weatherCurrent };
	} catch {
		error => console.log(error);
	}
}
