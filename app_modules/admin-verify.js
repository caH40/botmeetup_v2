export async function adminVerify(ctx) {
	try {
		const userId = ctx.message.from.id;
		const chatId = ctx.message.chat.id;

		const admins = await ctx.telegram.getChatAdministrators(chatId);

		let isAdmin = false;
		admins.forEach(member => {
			if (member.user.id === userId) {
				isAdmin = true;
			}
		});

		return isAdmin;
	} catch (error) {
		console.log(error);
	}
}
