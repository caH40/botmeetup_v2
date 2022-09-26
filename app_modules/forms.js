//итоговое объявление о заезде
import { timeLeft } from '../utility/utilites.js';

export function formFinalPost(ctx) {
	try {
		const userName = ctx.update.callback_query.from.username;
		ctx.session.leader = '@' + userName;
		return `${ctx.session.description ?? 'Детали заезда:'}\nМесто старта: ${
			ctx.session.locationStart ?? '---'
		}\nДата заезда: ${ctx.session.date ?? '---'}\nВремя старта: ${
			ctx.session.time ?? '---'
		}\nДистанция: ${ctx.session.distance ?? '---'} \nTемп: ${
			ctx.session.speed ?? '---'
		}\nОрганизатор заезда: ${ctx.session.leader}`;
	} catch (error) {
		console.log(error);
	}
}
export async function formFinalPostUpdate(post) {
	try {
		const {
			description,
			locationStart,
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

		const timeLeftStr = timeLeft(date, time);

		return `${description ?? 'Детали заезда:'}\nМесто старта: ${
			locationStart ?? '-'
		};\nДата заезда: ${date ?? '-'};\nВремя старта: ${time ?? '-'};\nОсталось до старта: ${
			timeLeftStr ?? '-'
		};\nДистанция: ${distance ?? '-'};\nTемп: ${speed ?? '-'};\nПогода: ${
			Math.round(tempDay) ?? '-'
		}°C, ${humidity ?? '-'}%, ${
			descriptionWeather ?? '-'
		};\nОрганизатор заезда: ${leader}\nКоличество участников: ${pollQuantity ?? '?'}`;
	} catch (error) {
		console.log(error);
	}
}

export function formConfig(configFromDB) {
	try {
		return `<b>channelOwnerId:</b> ${configFromDB.channelOwnerId}\n<b>channelId:</b> ${configFromDB.channelId}\n<b>channelTitle:</b> ${configFromDB.channelTitle}\n<b>channelName:</b> ${configFromDB.channelName}\n<b>groupId:</b> ${configFromDB.groupId}\n<b>groupTitle:</b> ${configFromDB.groupTitle}\n<b>apiWeather:</b> ${configFromDB.apiWeather}\n`;
	} catch (error) {
		console.log(error);
	}
}

export function formWeather(weatherCurrent) {
	return `Температура утром: ${weatherCurrent.tempMorn ?? '---'}°C\nТемпература днём: ${
		weatherCurrent.tempDay ?? '---'
	}°C\nТемпература вечером: ${weatherCurrent.tempEve ?? '---'}°C\nВлажность: ${
		weatherCurrent.humidity ?? '---'
	}%\nСкорость ветра: ${weatherCurrent.windSpeed ?? '---'}м/с\n${weatherCurrent.desc ?? '---'}`;
}
