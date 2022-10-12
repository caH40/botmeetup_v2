export async function ownerVerify(ctx) {
	try {
		const userId = ctx.message.from.id;
		const chatId = ctx.message.chat.id;
		const chatMember = await ctx.telegram.getChatMember(chatId, userId);
		if (chatMember.status === 'creator') return true;
		return false;
	} catch (error) {
		console.log(error);
	}
}
