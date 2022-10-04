import { getFullDay } from '../utility/utilites.js';
import { mainMenu } from './mainmenu.js';
import { createDayArr, timesArr, distanceArr, speedArr } from './buttons.js';
import buttonEmpty from './button-empty.js';
import { patternGet, patternsForGet } from './small_handlers/pattern-get.js';
import { patternDel, patternsForDel } from './small_handlers/pattern-del.js';
import { postDelete, postEdit } from './small_handlers/post-edit.js';

export async function handlerSubMenu(ctx, cbqData) {
	try {
		// редактирование создаваемого объявления
		if (cbqData === 'meetEdit_back' || cbqData === 'meetEdit_pattern_back') {
			mainMenu(ctx);
		}
		// обработка данных всех подменю
		if (createDayArr().includes(cbqData)) {
			ctx.session.date = getFullDay(cbqData);
			ctx.session.start[0][0].text = 'Дата заезда ✔️';
			mainMenu(ctx);
		}
		if (timesArr.includes(cbqData)) {
			ctx.session.time = cbqData;
			ctx.session.start[0][1].text = 'Время старта ✔️';
			mainMenu(ctx);
		}
		if (cbqData.includes('mainLocation_') && cbqData !== 'mainLocation_***') {
			const location = cbqData.slice(13);
			ctx.session.locationStart = location;
			ctx.session.start[1][0].text = 'Место старта ✔️';
			mainMenu(ctx);
		}
		if (cbqData.includes('weather_') && cbqData !== 'weather_***') {
			const locationWeather = cbqData.slice(8);
			ctx.session.locationWeather = locationWeather;
			ctx.session.start[1][1].text = 'Погода ✔️';
			mainMenu(ctx);
		}
		if (distanceArr.includes(cbqData)) {
			ctx.session.distance = cbqData;
			ctx.session.start[2][0].text = 'Дистанция, км ✔️';
			mainMenu(ctx);
		}
		if (speedArr.includes(cbqData)) {
			ctx.session.speed = cbqData;
			ctx.session.start[2][1].text = 'Средняя скорость ✔️';
			mainMenu(ctx);
		}

		if (cbqData === 'mainLocation_***') await buttonEmpty.meetLocation(ctx, cbqData);
		if (cbqData === 'weather_***') await buttonEmpty.meetWeather(ctx, cbqData);

		if (cbqData === 'meetPatternGet') await patternsForGet(ctx, cbqData);
		if (cbqData === 'meetPatternDel') await patternsForDel(ctx, cbqData);

		if (cbqData.includes('postId_get_')) await patternGet(ctx, cbqData);
		if (cbqData.includes('postId_del_')) await patternDel(ctx, cbqData);

		if (cbqData.includes('postId_editPost_')) await postEdit(ctx, cbqData);
		if (cbqData.includes('postId_delPost_')) await postDelete(ctx, cbqData);

		// // блок удаления автором ненужных объявлений с канала объявлений
		// if (cbqData.includes('ffmi')) {
		// 	await deletePost(cbqData, ctx).catch(error => console.log(error));
		// }
	} catch (error) {
		console.log(error);
	}
}
