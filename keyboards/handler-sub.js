import { getFullDay } from '../utility/utilites.js';
import { mainMenu } from './mainmenu.js';
import {
	createDayArr,
	timesArr,
	distanceArr,
	speedArr,
	levelArr,
	locationsWeather,
} from './buttons.js';

export async function handlerSubMenu(ctx, cbqData) {
	try {
		// редактирование создаваемого объявления
		if (cbqData === 'meetEdit') {
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
		if (cbqData.includes('mainLocation_')) {
			const location = cbqData.slice(13);
			ctx.session.locationStart = location;
			ctx.session.start[1][0].text = 'Место старта ✔️';
			mainMenu(ctx);
		}

		if (distanceArr.includes(cbqData)) {
			ctx.session.distance = cbqData;
			ctx.session.start[1][1].text = 'Дистанция, км ✔️';
			mainMenu(ctx);
		}
		if (speedArr.includes(cbqData)) {
			ctx.session.speed = cbqData;
			ctx.session.start[2][0].text = 'Средняя скорость ✔️';
			mainMenu(ctx);
		}
		if (locationsWeather.includes(cbqData)) {
			ctx.session.locationWeather = cbqData.split(' ')[0];
			ctx.session.start[2][1].text = 'Погода ✔️';
			mainMenu(ctx);
		}
		// if (levelArr.includes(cbqData)) {
		// 	ctx.session.level = cbqData;
		// 	ctx.session.start[2][1].text = 'Сложность заезда ✔️';
		// 	mainMenu(ctx);
		// }
		// // блок удаления автором ненужных объявлений с канала объявлений
		// if (cbqData.includes('ffmi')) {
		// 	await deletePost(cbqData, ctx).catch(error => console.log(error));
		// }
	} catch (error) {
		console.log(error);
	}
}
