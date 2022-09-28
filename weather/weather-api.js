import 'dotenv/config';
import fetch from 'node-fetch';
import { WeatherWeek } from '../model/WeatherWeek.js';
import { BotSetup } from '../model/BotSetup.js';
import { cityList } from './city-mylist.js';

export async function weatherFromApi() {
	const { apiKeyWeather } = await BotSetup.findOne();
	const cityMy = ['Пятигорск', 'Кисловодск'];

	//массив для сохранения в БД
	const arrayWeather = [];

	for (let indexCity = 0; indexCity < cityMy.length; indexCity++) {
		let { lon, lat } = cityList.filter(city => city.name === cityMy[indexCity])[0].coord;

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

			const dayMyObj = {
				1: 'Понедельник',
				2: 'Вторник',
				3: 'Среда',
				4: 'Четверг',
				5: 'Пятница',
				6: 'Суббота',
				0: 'Воскресенье',
			};

			const dayWeatherForDB = {
				dateUpdate: dateUpdate,
				date: weatherDate,
				dateString: dayMyObj[dayWeather],
				city: cityMy[indexCity],
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
	await getWeatherWeek();

	async function getWeatherWeek() {
		const savedWeather = await WeatherWeek.findOne();
		if (savedWeather) {
			await WeatherWeek.findByIdAndUpdate(savedWeather.id, { list: arrayWeather });
		} else {
			const weatherWeek = new WeatherWeek({ list: arrayWeather });
			await weatherWeek.save();
		}
	}
}
