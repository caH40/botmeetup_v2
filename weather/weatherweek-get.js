import { WeatherWeek } from '../model/WeatherWeek.js';

export async function getWeatherWeek(arrayWeather) {
	try {
		const savedWeather = await WeatherWeek.findOne();
		if (savedWeather) {
			await WeatherWeek.findByIdAndUpdate(savedWeather.id, { list: arrayWeather });
		} else {
			const weatherWeek = new WeatherWeek({ list: arrayWeather });
			await weatherWeek.save();
		}
	} catch (error) {
		console.log(error);
	}
}
