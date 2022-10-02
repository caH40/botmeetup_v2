export async function adminVerify(ctx) {
	//сделать проверку что общение в группе/канале, а не с ботом
	try {
		let isAdmin = false;

		const userId = ctx.message.from.id;
		const chatId = ctx.message.chat.id;
		const chatType = ctx.message.chat.type;

		if (chatType === 'private') return false;

		const admins = await ctx.telegram.getChatAdministrators(chatId);

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
