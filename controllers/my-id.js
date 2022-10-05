export async function getMyId(ctx) {
	try {
		const myId = ctx.update.message.from.id;
		if (myId == 777000) {
			const senderChatId = ctx.update.message.chat.id;
			const messageIdGroup = ctx.update.message.message_id;
			await ctx.telegram.sendMessage(
				senderChatId,
				'Команда получения id пользователя /myid не работает в каналах. Необходимо запустить её в группе или приватным сообщением боту.',
				{ reply_to_message_id: messageIdGroup }
			);
			return;
		}
		if (ctx.update.message.reply_to_message) {
			const senderChatId = ctx.update.message.chat.id;
			const messageIdGroup = ctx.update.message.message_id;
			await ctx.telegram.sendMessage(senderChatId, `Ваш Id в телеграмм: ${myId}`, {
				reply_to_message_id: messageIdGroup,
			});
		}

		await ctx.reply(`Ваш Id в телеграмм: ${myId}`);
	} catch (error) {
		console.log(error);
	}
}
