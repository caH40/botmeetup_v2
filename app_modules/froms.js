//итоговое объявление о заезде
export function formFinalPost(ctx) {
	try {
		const userName = ctx.update.callback_query.from.username;
		ctx.session.creatM = '@' + userName;
		return `${ctx.session.description ?? 'Детали заезда:'}\nМесто старта: ${
			ctx.session.locationsM ?? '---'
		}\nДата заезда: ${ctx.session.dateM ?? '---'}\nВремя старта: ${
			ctx.session.timeM ?? '---'
		}\nДистанция: ${ctx.session.distanceM ?? '---'} \nTемп: ${
			ctx.session.speedM ?? '---'
		}\nСложность: ${ctx.session.levelM ?? '---'}\nОрганизатор заезда: ${ctx.session.creatM}`;
	} catch (error) {
		console.log(error);
	}
}

export function formConfig(configFromDB) {
	try {
		return `<b>channelOwnerId:</b> ${configFromDB.channelOwnerId}\n<b>channelId:</b> ${configFromDB.channelId}\n<b>channelTitle:</b> ${configFromDB.channelTitle}\n<b>channelName:</b> ${configFromDB.channelName}\n<b>groupId:</b> ${configFromDB.groupId}\n<b>groupTitle:</b> ${configFromDB.groupTitle}\n<b>apiWeather:</b> ${configFromDB.apiWeather}\n`;
	} catch (error) {
		console.log(error);
	}
}
