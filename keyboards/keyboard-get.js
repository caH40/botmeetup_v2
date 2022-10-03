export async function getKeyboard(ctx, title, keyboard) {
	try {
		const response = await ctx.reply(title, {
			reply_markup: { inline_keyboard: keyboard },
			parse_mode: 'html',
		});
		return response.message_id;
	} catch (error) {
		console.log(error);
	}
}
