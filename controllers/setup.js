import { apiWeather } from '../app_modules/api-weather.js';
import { ownerVerify } from '../app_modules/owner-verify.js';

export async function setup(ctx) {
	try {
		const isOwner = await ownerVerify(ctx);
		if (!isOwner) return await ctx.reply('Команда доступна только владельцу канала.');

		ctx.scene.enter('setup');
	} catch (error) {
		console.log(error);
	}
}
