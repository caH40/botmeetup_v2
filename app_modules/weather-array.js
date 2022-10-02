//исключение дубликатов в массиве
export function createLocationsWeather(locationsDB) {
	try {
		let locationsWeather = [];
		locationsDB.forEach(location => {
			locationsWeather = [...locationsWeather, ...location.weather];
		});

		let result = [];

		locationsWeather.forEach(location => {
			if (result.includes(location)) return;
			result.push(location);
		});

		return result;
	} catch (error) {
		console.log(error);
	}
}
