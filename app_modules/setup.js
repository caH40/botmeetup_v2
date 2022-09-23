import { adminVerify } from './admin-verify.js';

//настройка бота для канала, данные сохраняются в БД
//урл на API погоды
//id и название канала
//id и название дискуссионной группы канала
//определиться где добавляются города, из общего чата или из сессии сетап
export async function setup(ctx) {
	try {
		// проверка должна осуществляться из данных DB
		// const isAdmin = await adminVerify(ctx);
		// if (!isAdmin)
		// 	return await ctx.reply('Команда доступна только админам канала "channelName from DB "');

		await ctx.scene.enter('setup');
	} catch (error) {
		console.log(error);
	}
}
