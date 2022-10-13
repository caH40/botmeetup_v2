//итоговое объявление о заезде
import { Poll } from '../model/Poll.js';
import { isActualDate, timeLeft } from '../utility/utilites.js';

export function formFinalPost(ctx) {
	try {
		const userName = ctx.update.callback_query.from.username;
		const userId = ctx.update.callback_query.from.id;
		ctx.session.leader = '@' + userName;
		ctx.session.userId = userId;
		return `${ctx.session.description ?? 'Детали заезда:'}\n<b>Место старта:</b> ${
			ctx.session.locationStart ?? '---'
		};\n<b>Дата заезда:</b> ${ctx.session.date ?? '---'};\n<b>Время старта:</b> ${
			ctx.session.time ?? '---'
		};\n<b>Дистанция:</b> ${ctx.session.distance ?? '---'};\n<b>Tемп:</b> ${
			ctx.session.speed ?? '---'
		};\n<b>Погода (${ctx.session.locationWeather ?? '---'}):</b>\n<b>Организатор заезда:</b> ${
			ctx.session.leader
		}`;
	} catch (error) {
		console.log(error);
	}
}
export async function formFinalPostUpdate(post) {
	try {
		const {
			_id,
			description,
			locationStart,
			locationWeather,
			date,
			time,
			distance,
			speed,
			tempDay,
			humidity,
			descriptionWeather,
			leader,
		} = post;

		let timeLeftStr = timeLeft(date, time);

		if (!isActualDate(date, time)) timeLeftStr = '<u>СТАРТ УЖЕ БЫЛ!!!</u>';

		//иногда не успевает сохраниться документ с голосованием в БД до его запроса из БД
		const pollDB = await Poll.findOne({ postId: _id });
		let pollQuantityStr;
		if (!pollDB) {
			pollQuantityStr = `\n<b>Количество участников:</b> 0`;
		} else {
			if (pollDB.poll) {
				pollQuantityStr = `\n<b>Количество участников:</b> ${pollDB.pollQuantity}`;
			} else {
				pollQuantityStr = '';
			}
		}

		//строка о погоде
		let weatherStr = '';
		if (tempDay) {
			weatherStr = `<b>Погода (${locationWeather}):</b> ${Math.round(tempDay) ?? '-'}°C, ${
				humidity ?? '-'
			}%, ${descriptionWeather ?? '-'};`;
		} else {
			weatherStr = `<b>Погода (${locationWeather}):</b> Нет данных;`;
		}

		return `${description ?? 'Детали заезда:'}\n<b>Место старта:</b> ${
			locationStart ?? '-'
		};\n<b>Дата заезда:</b> ${date ?? '-'};\n<b>Время старта:</b> ${
			time ?? '-'
		};\n<b>Осталось до старта:</b> ${timeLeftStr ?? '-'};\n<b>Дистанция:</b> ${
			distance ?? '-'
		};\n<b>Tемп:</b> ${
			speed ?? '-'
		};\n${weatherStr}\n<b>Организатор заезда:</b> ${leader}${pollQuantityStr}`;
	} catch (error) {
		console.log(error);
	}
}

export function formConfig(configFromDB) {
	try {
		return `<b>ownerId:</b> ${configFromDB.ownerId}\n<b>channelId:</b> ${configFromDB.channelId}\n<b>channelTitle:</b> ${configFromDB.channelTitle}\n<b>channelName:</b> ${configFromDB.channelName}\n<b>groupId:</b> ${configFromDB.groupId}\n<b>groupTitle:</b> ${configFromDB.groupTitle}\n<b>apiWeather:</b> ${configFromDB.apiKeyWeather}\n`;
	} catch (error) {
		console.log(error);
	}
}

export function formWeather(weatherCurrent) {
	try {
		// console.log(weatherCurrent);
		return `Место мониторинга: ${weatherCurrent.city.name ?? '---'}\nТемпература утром: ${
			weatherCurrent.tempMorn ?? '---'
		}°C\nТемпература днём: ${weatherCurrent.tempDay ?? '---'}°C\nТемпература вечером: ${
			weatherCurrent.tempEve ?? '---'
		}°C\nВлажность: ${weatherCurrent.humidity ?? '---'}%\nСкорость ветра: ${
			weatherCurrent.windSpeed ?? '---'
		}м/с\n${weatherCurrent.desc ?? 'Нет данных о погоде.'}`;
	} catch (error) {
		console.log(error);
	}
}

export function formPattern(post, index) {
	try {
		const { description, date, locationStart, locationWeather, time, distance, speed } = post;

		return `<u>№${index + 1}</u>\n${description ?? 'Детали заезда:'}\n<b>Место старта:</b> ${
			locationStart ?? '-'
		};\n<b>Дата заезда:</b> ${date ?? '-'};\n<b>Время старта:</b> ${
			time ?? '-'
		};\n<b>Дистанция:</b> ${distance ?? '-'};\n<b>Tемп:</b> ${
			speed ?? '-'
		};\n<b>Погода:</b>${locationWeather}`;
	} catch (error) {
		console.log(error);
	}
}
