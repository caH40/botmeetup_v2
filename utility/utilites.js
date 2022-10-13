const week = {
	'Пн.': 'Понедельник',
	'Вт.': 'Вторник',
	'Ср.': 'Среда',
	'Чт.': 'Четверг',
	'Пт.': 'Пятница',
	'Сб.': 'Суббота',
	'Вс.': 'Воскресенье',
};

export const conversionDays = {
	1: 'Понедельник',
	2: 'Вторник',
	3: 'Среда',
	4: 'Четверг',
	5: 'Пятница',
	6: 'Суббота',
	0: 'Воскресенье',
};

const millisecondsInHour = 3600000;
const millisecondsInMinute = 60000;

export function getFullDay(date) {
	try {
		const day = date.slice(0, 3);
		const dateNumbers = date.slice(3);
		return week[day] + dateNumbers;
	} catch (error) {
		console.log(error);
	}
}

function getTime(date, time) {
	try {
		const timeArr = time.split(':');
		const timeMilliseconds = timeArr[0] * millisecondsInHour + timeArr[1] * millisecondsInMinute;

		const dateClear = date.slice(-10);
		const dateArr = dateClear.split('.');
		const dateNewFormat = [dateArr[1], dateArr[0], dateArr[2]].join('.');

		const dateMilliseconds = new Date(dateNewFormat).getTime() + timeMilliseconds;
		const todayMilliseconds = new Date().getTime();
		return { dateMilliseconds, todayMilliseconds };
	} catch (error) {
		console.log(error);
	}
}

//в прошедшем заезде не обновлять погоду
export function isActualDate(date, time) {
	try {
		const ml = getTime(date, time);
		return ml.dateMilliseconds > ml.todayMilliseconds;
	} catch (error) {
		console.log(error);
	}
}

// расчет оставшегося времени до заезда
export function timeLeft(date, time) {
	try {
		const ml = getTime(date, time);

		const hoursDecimal = (ml.dateMilliseconds - ml.todayMilliseconds) / millisecondsInHour;

		const hours = Math.trunc(hoursDecimal);
		const minutes = Math.trunc((hoursDecimal - hours) * 60);
		return `${hours}ч, ${minutes}мин`;
	} catch (error) {
		console.log(error);
	}
}

export function dateExpired(ticketDB) {
	return new Date(ticketDB.datePurchase + ticketDB.duration).toLocaleString();
}
