import { adminVerify } from './admin-verify.js';

//This is a scene for editing an array of cites
export async function editCity(ctx) {
	try {
		await ctx.reply('This is the command /city'); //for dev
		const isAdmin = await adminVerify(ctx);

		await ctx.scene.enter('city');
	} catch (error) {
		console.log(error);
	}
}
