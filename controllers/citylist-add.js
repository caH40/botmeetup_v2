import 'dotenv/config';

import { City } from '../model/City.js';
import { cityList } from '../src/citylistru.js';

export async function addCityList(ctx) {
	try {
		if (ctx.message.from.id !== process.env.MY_TELEGRAM_ID)
			return await ctx.reply('Данная команда доступна только СуперАдмину!');
		const dateStart = new Date().getTime();
		cityList.forEach(async city => {
			const cities = new City(city);
			await cities.save();
		});

		await ctx.reply(
			'Количество секунд на выполнение операции',
			(new Date().getTime() - dateStart) / 1000
		);
	} catch (error) {
		console.log(error);
	}
}
