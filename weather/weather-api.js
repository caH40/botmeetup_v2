import 'dotenv/config';
import fetch from 'node-fetch';
import { BotSetup } from '../model/BotSetup.js';
import { createLocationsWeather } from '../app_modules/weather-array.js';
import { conversionDays } from '../utility/utilites.js';
import { getWeatherWeek } from './weatherweek-get.js';

export async function weatherFromApi() {
	try {
		const { apiKeyWeather } = await BotSetup.findOne();
		const locationsWeather = await createLocationsWeather();
		//массив для сохранения в БД
		const arrayWeather = [];

		for (let indexCity = 0; indexCity < locationsWeather.length; indexCity++) {
			let { lon, lat } = locationsWeather[indexCity];

			const requestUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${apiKeyWeather}&exclude=hourly&units=metric&lang=ru`;
			const response = await fetch(requestUrl);
			const data = await response.json();

			const quantityDays = 8;
			for (let indexDay = 0; indexDay < quantityDays; indexDay++) {
				const weatherDate = new Date(data.daily[indexDay].dt * 1000).toLocaleDateString();
				const weatherTempDay = data.daily[indexDay].temp.day;
				const weatherTempMorn = data.daily[indexDay].temp.morn;
				const weatherTempEve = data.daily[indexDay].temp.eve;
				const weatherHumidity = data.daily[indexDay].humidity;
				const weatherWindSpeed = data.daily[indexDay].wind_speed;
				const weatherDescription = data.daily[indexDay].weather[0].description;
				const dayWeather = new Date(data.daily[indexDay].dt * 1000).getDay();
				const dateUpdate = new Date().toLocaleString();

				const dayWeatherForDB = {
					dateUpdate: dateUpdate,
					date: weatherDate,
					dateString: conversionDays[dayWeather],
					city: locationsWeather[indexCity],
					tempMorn: weatherTempMorn,
					tempDay: weatherTempDay,
					tempEve: weatherTempEve,
					humidity: weatherHumidity,
					windSpeed: weatherWindSpeed,
					desc: weatherDescription,
				};
				// формирование массива погоды с отфильтрованными данными
				arrayWeather.push(dayWeatherForDB);
			}
		}
		//обновление данных о погоде в базе данных, если нет, то создает новую коллекцию
		await getWeatherWeek(arrayWeather);
	} catch (error) {
		console.log(error);
	}
}
