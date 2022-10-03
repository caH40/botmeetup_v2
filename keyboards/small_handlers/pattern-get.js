import { formPattern } from '../../app_modules/forms.js';
import { Post } from '../../model/Post.js';
import { getKeyboard } from '../keyboard-get.js';
import { keyboardPatternSub, keyboardBack } from '../keyboards.js';
import { mainMenu } from '../mainmenu.js';

export async function patternsForGet(ctx, cbqData) {
	try {
		const userId = ctx.update.callback_query.from.id;
		const postsDB = await Post.find({ userId, isPattern: true });

		for (let index = 0; index < postsDB.length; index++) {
			if (index === postsDB.length - 1) {
				const response = await getKeyboard(ctx, formPattern(postsDB[index]), [
					...keyboardPatternSub(postsDB[index], index, 'get_', 'Выбрать сообщение №'),
					...keyboardBack('Вернутся в главное меню', 'meetEdit_pattern_'),
				]);
				ctx.session.messageDel.push(response);
				return;
			}
			const response = await getKeyboard(
				ctx,
				formPattern(postsDB[index]),
				keyboardPatternSub(postsDB[index], index, 'get_', 'Выбрать сообщение №')
			);
			ctx.session.messageDel.push(response);
		}
	} catch (error) {
		console.log(error);
	}
}
export async function patternGet(ctx, cbqData) {
	try {
		const _id = cbqData.slice(11);

		const postDB = await Post.findOne({ _id });
		ctx.session.time = postDB.time;
		ctx.session.leader = postDB.leader;
		ctx.session.userId = postDB.userId;
		ctx.session.locationStart = postDB.locationStart;
		ctx.session.locationWeather = postDB.locationWeather;
		ctx.session.distance = postDB.distance;
		ctx.session.speed = postDB.speed;
		ctx.session.photoId = postDB.photoId;
		ctx.session.description = postDB.description;

		ctx.session.start[0][1].text = 'Время старта ✔️';
		ctx.session.start[1][0].text = 'Место старта ✔️';
		ctx.session.start[1][1].text = 'Погода ✔️';
		ctx.session.start[2][0].text = 'Дистанция, км ✔️';
		ctx.session.start[2][1].text = 'Средняя скорость ✔️';
		ctx.session.start[3][0].text = 'Картинка ✔️';
		ctx.session.start[3][1].text = 'Описание ✔️';
		await mainMenu(ctx);
	} catch (error) {
		console.log(error);
	}
}
