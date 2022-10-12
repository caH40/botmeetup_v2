import { City } from '../model/City.js';
import { cityList } from '../src/citylistru.js';

export async function addCityList() {
	try {
		const cities = City({ city: cityList });
		await cities.save();
	} catch (error) {
		console.log(error);
	}
}
