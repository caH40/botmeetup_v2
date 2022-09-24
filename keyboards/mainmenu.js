export async function mainMenu(ctx) {
	try {
		await ctx.reply('Выберите блок заполнения', {
			reply_markup: { inline_keyboard: ctx.session.start },
		});
	} catch (error) {
		console.log(error);
	}
}
