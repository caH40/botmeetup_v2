export async function creatorVerify(ctx) {
	try {
		// проверка проводится первой настройки бота из привязанной группы к каналу
		const userId = ctx.message.from.id;
		const chatId = ctx.message.chat.id;
		const chatMember = await ctx.telegram.getChatMember(chatId, userId);
		if (chatMember.status === 'creator') return true;
		return false;
	} catch (error) {
		console.log(error);
	}
}
