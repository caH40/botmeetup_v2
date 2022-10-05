import { apiWeather } from '../app_modules/api-weather.js';
import { ownerVerify } from '../app_modules/owner-verify.js';

export async function setup(ctx) {
	try {
		const isOwner = await ownerVerify(ctx);
		if (!isOwner)
			return await ctx.reply(`У вас нет прав использовать данную команду.`, { parse_mode: 'html' });

		ctx.scene.enter('setup');
	} catch (error) {
		console.log(error);
	}
}
