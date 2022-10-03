export async function weather(ctx) {
	try {
		await ctx.reply('Укажите место для прогноза погоды');
	} catch (error) {
		console.log(error);
	}
}
