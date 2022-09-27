import { updatePost } from '../app_modules/update-post.js';
import { Post } from '../model/Post.js';
import { BotSetup } from '../model/BotSetup.js';

export async function poll(ctx) {
	try {
		// console.log(ctx.update); //for dev
		const pollId = ctx.update.poll_answer.poll_id;
		const pollUserId = ctx.update.poll_answer.user.id;
		const pollUsername = ctx.update.poll_answer.user.username;
		const pollOption = ctx.update.poll_answer.option_ids;

		let postDB = await Post.findOne({
			'poll.id': pollId,
		});
		if (!postDB)
			return console.log(
				new Date().toLocaleString(),
				'в документе нет объекта poll',
				'module - poll.js'
			);

		let pollUsers = postDB.pollUsers;
		const { groupId } = await BotSetup.findOne();
		const { isLastUpdated, messageIdGroup } = postDB;
		const firstName = ctx.update.poll_answer.user.first_name;

		if (isLastUpdated) {
			const optionalOptions = {
				reply_to_message_id: messageIdGroup,
			};
			return await ctx.telegram.sendMessage(
				groupId,
				`${firstName}, Вы опоздали с голосованием, заезд уже состоялся!`,
				optionalOptions
			);
		}

		// исключение дублирование голосования одним и тем же пользователем
		// если уже есть в массиве то условие не выполняется !pollUserIds.includes(pollUserId)
		let hasPollUser = false;
		pollUsers.forEach(user => {
			if (user.userId === pollUserId) {
				hasPollUser = true;
			}
		});
		if (pollOption[0] === 0 && !hasPollUser) {
			pollUsers.push({ userId: pollUserId, username: pollUsername });
		}

		if (pollOption.length === 0 && hasPollUser) {
			// Удаление из массивов pollUserId и pollUsername пользователя, который отменил свое голосования, а ранне он голосовал "YES"
			pollUsers = pollUsers.filter(user => user.userId !== pollUserId);
		}
		const pollQuantity = pollUsers.length;
		const response = await Post.findOneAndUpdate(
			{ 'poll.id': pollId },
			{ $set: { pollUsers, pollQuantity } }
		);
		// обновление постов
		await updatePost(ctx, response._id);
	} catch (error) {
		console.log(error);
	}
}
