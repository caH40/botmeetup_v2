import { City } from '../model/City.js';
import { Post } from '../model/Post.js';
//исключение дубликатов в массиве
export async function createLocationsWeather() {
	try {
		// выборка из каждого поста города мониторинга погоды и пушинг в массив
		let locationsWeather = [];
		const postsDB = await Post.find();
		postsDB.forEach(post => {
			locationsWeather = [...locationsWeather, post.locationWeather];
		});
		console.log('locationsWeather', locationsWeather);

		let result = [];

		for (let index = 0; index < locationsWeather.length; index++) {
			const city = await City.findOne({ name: locationsWeather[index] });
			result.push(city);
		}

		return result;
	} catch (error) {
		console.log(error);
	}
}
