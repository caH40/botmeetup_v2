export async function getKeyboard(ctx, title, keyboard) {
	try {
		await ctx.reply(title, {
			reply_markup: { inline_keyboard: keyboard },
			parse_mode: 'html',
		});
	} catch (error) {
		console.log(error);
	}
}
