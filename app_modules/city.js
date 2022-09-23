import { adminVerify } from './admin-verify.js';

//This is a scene for editing an array of cites
//создать функционал добавления/удаления городов (инлайн клавиатуры)
export async function editCity(ctx) {
	try {
		// const isAdmin = await adminVerify(ctx);
		// if (!isAdmin)
		// 	return await ctx.reply('Команда доступна только админам канала "channelName from DB "');
		// await ctx.scene.enter('city');
	} catch (error) {
		console.log(error);
	}
}
