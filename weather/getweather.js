import { WeatherWeek } from '../model/WeatherWeek.js';

import { weather } from '../app_modules/froms.js';

//!! делается запрос погоды из базы при каждой итерации(количество объявлений), необходимо это исправить

export async function getWeather(date, location) {
	try {
		const weatherDB = await WeatherWeek.findOne();

		let weatherCurrent = weatherDB.list.find(elm => elm.date == date && elm.city === location);
		weatherCurrent ??= [];
		weatherCurrent.description ??= 'Предсказываю погоду на более близкие даты...';
		weatherCurrent.description =
			weatherCurrent.description.charAt(0).toUpperCase() + weatherCurrent.desc.slice(1);

		const formWeather = weather(weatherCurrent);

		return { formWeather, weatherCurrent };
	} catch {
		error => console.log(error);
	}
}
