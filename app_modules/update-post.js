import { Post } from '../model/Post.js';
import { formFinalPostUpdate } from './forms.js';

export async function updatePost(bot) {
	try {
		const postsDB = await Post.find({ isLastUpdate: false });

		for (let index = 0; index < postsDB.length; index++) {
			const formPostString = await formFinalPostUpdate(postsDB[index]);
			await bot.telegram.editMessageCaption(
				postsDB[index].channelId,
				postsDB[index].messageId,
				'привет!',
				formPostString,
				{
					parse_mode: 'html',
				}
			);
			if (!postsDB[index].isActual) {
				await Post.findOneAndUpdate({ _id: postsDB[index] }, { $set: { isLastUpdate: true } });
			}
		}
	} catch (error) {
		console.log(error);
	}
}
