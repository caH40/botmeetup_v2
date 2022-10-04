//итоговое объявление о заезде
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
export function formFinalPostUpdate(post) {
	try {
		// console.log(post);
		// console.log(post);
		const {
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
			pollQuantity,
			leader,
		} = post;

		let timeLeftStr = timeLeft(date, time);

		if (!isActualDate(date, time)) timeLeftStr = '<u>СТАРТ УЖЕ БЫЛ!!!</u>';

		//если нет данных о голосовании, то не показывать количество участников на главной странице
		let pollQuantityStr;
		if (post.poll) {
			pollQuantityStr = `\n<b>Количество участников:</b> ${pollQuantity}`;
		} else {
			pollQuantityStr = '';
		}

		//строка о погоде
		let weatherStr = '';
		if (tempDay === '') {
			weatherStr = `<b>Погода:</b> Нет данных;`;
		} else {
			weatherStr = `<b>Погода (${locationWeather}):</b> ${Math.round(tempDay) ?? '-'}°C, ${
				humidity ?? '-'
			}%, ${descriptionWeather ?? '-'};`;
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
		return `<b>channelOwnerId:</b> ${configFromDB.channelOwnerId}\n<b>channelId:</b> ${configFromDB.channelId}\n<b>channelTitle:</b> ${configFromDB.channelTitle}\n<b>channelName:</b> ${configFromDB.channelName}\n<b>groupId:</b> ${configFromDB.groupId}\n<b>groupTitle:</b> ${configFromDB.groupTitle}\n<b>apiWeather:</b> ${configFromDB.apiKeyWeather}\n`;
	} catch (error) {
		console.log(error);
	}
}

export function formWeather(weatherCurrent) {
	try {
		return `Место мониторинга: ${weatherCurrent.city ?? '---'}\nТемпература утром: ${
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
		const { description, locationStart, locationWeather, time, distance, speed } = post;

		return `<u>№${index + 1}</u>\n${description ?? 'Детали заезда:'}\n<b>Место старта:</b> ${
			locationStart ?? '-'
		};\n<b>Время старта:</b> ${time ?? '-'};\n<b>Дистанция:</b> ${distance ?? '-'};\n<b>Tемп:</b> ${
			speed ?? '-'
		};\n<b>Погода:</b>${locationWeather}`;
	} catch (error) {
		console.log(error);
	}
}
