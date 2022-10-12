import { City } from '../model/City.js';

export async function meetLocation(ctx, str) {
	try {
		const cities = await City.find({ name: { $regex: str } });
		cities.forEach(async city => {
			await ctx.reply(`Город: ${city.name}`);
		});
	} catch (error) {
		console.log(error);
	}
}
