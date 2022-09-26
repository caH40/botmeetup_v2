import { Post } from '../model/Post.js';
import { formFinalPostUpdate } from './forms.js';

export async function updatePost(bot) {
	try {
		const postsDB = await Post.find();

		for (let index = 0; index < postsDB.length; index++) {
			const formPostString = await formFinalPostUpdate(postsDB[index]);
			// console.log(formPostString);
			await bot.telegram.editMessageCaption(
				postsDB[index].channelId,
				postsDB[index].messageId,
				'привет!',
				formPostString,
				{
					parse_mode: 'html',
				}
			);
		}
	} catch (error) {
		console.log(error);
	}
}
