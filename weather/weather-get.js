import { WeatherWeek } from '../model/WeatherWeek.js';
import { formWeather } from '../app_modules/forms.js';

//!! делается запрос погоды из базы при каждой итерации(количество объявлений), необходимо это исправить

export async function getWeather(date, location) {
	try {
		const weatherDB = await WeatherWeek.findOne();
		//если нет данных в БД, то выход
		if (!weatherDB) return {};

		let weatherCurrent = weatherDB.list.find(elm => elm.date == date && elm.city.name === location);
		weatherCurrent ??= {};

		//формирование строки для сообщения в телеге
		const formWeatherStr = formWeather(weatherCurrent);

		return { formWeatherStr, weatherCurrent };
	} catch {
		error => console.log(error);
	}
}
