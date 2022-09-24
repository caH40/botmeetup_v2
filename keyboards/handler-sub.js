import { getFullDay } from '../utility/utilites.js';
import { mainMenu } from './mainmenu.js';
import { creatDayArr, timesArr, distanceArr, speedArr, levelArr, locations } from './buttons.js';

export async function handlerSubMenu(ctx, cbqData) {
	try {
		// редактирование создаваемого объявления
		if (cbqData === 'meetEdit') {
			mainMenu(ctx);
		}
		// обработка данных всех подменю
		if (creatDayArr().includes(cbqData)) {
			ctx.session.dateM = getFullDay(cbqData);
			ctx.session.start[0][0].text = 'Дата заезда ✔️';
			mainMenu(ctx);
		}
		if (timesArr.includes(cbqData)) {
			ctx.session.timeM = cbqData;
			ctx.session.start[0][1].text = 'Время старта ✔️';
			mainMenu(ctx);
		}
		if (locations.includes(cbqData)) {
			ctx.session.locationsM = cbqData;
			ctx.session.start[1][0].text = 'Место старта ✔️';
			mainMenu(ctx);
		}
		if (distanceArr.includes(cbqData)) {
			ctx.session.distanceM = cbqData;
			ctx.session.start[1][1].text = 'Дистанция, км ✔️';
			mainMenu(ctx);
		}
		if (speedArr.includes(cbqData)) {
			ctx.session.speedM = cbqData;
			ctx.session.start[2][0].text = 'Средняя скорость ✔️';
			mainMenu(ctx);
		}
		if (levelArr.includes(cbqData)) {
			ctx.session.levelM = cbqData;
			ctx.session.start[2][1].text = 'Сложность заезда ✔️';
			mainMenu(ctx);
		}
		// // блок удаления автором ненужных объявлений с канала объявлений
		// if (cbqData.includes('ffmi')) {
		// 	await deletePost(cbqData, ctx).catch(error => console.log(error));
		// }
	} catch (error) {
		console.log(error);
	}
}
