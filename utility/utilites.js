const week = {
	'Пн.': 'Понедельник',
	'Вт.': 'Вторник',
	'Ср.': 'Среда',
	'Чт.': 'Четверг',
	'Пт.': 'Пятница',
	'Сб.': 'Суббота',
	'Вс.': 'Воскресенье',
};
export function getFullDay(date) {
	try {
		const day = date.slice(0, 3);
		const dateNumbers = date.slice(3);
		return week[day] + dateNumbers;
	} catch (error) {
		console.log(error);
	}
}

//в прошедшем заезде не обновлять погоду
export function isActualDate(date) {
	const dateArr = date.split('.');
	const lag = 80000000;
	const dateNewFormat = [dateArr[1], dateArr[0], dateArr[2]].join('.');
	const dateMilliseconds = new Date(dateNewFormat).getTime() + lag;
	const todayMilliseconds = new Date().getTime();

	return dateMilliseconds > todayMilliseconds;
}
export function timeLeft(date, time) {
	const millisecondsInHour = 3600000;
	const millisecondsInMinute = 60000;

	const timeArr = time.split(':');
	const timeMilliseconds = timeArr[0] * millisecondsInHour + timeArr[1] * millisecondsInMinute;

	const dateClear = date.slice(-10);
	const dateArr = dateClear.split('.');
	const dateNewFormat = [dateArr[1], dateArr[0], dateArr[2]].join('.');

	const dateMilliseconds = new Date(dateNewFormat).getTime() + timeMilliseconds;
	const todayMilliseconds = new Date().getTime();

	const hoursDecimal = (dateMilliseconds - todayMilliseconds) / millisecondsInHour;

	const hours = Math.trunc(hoursDecimal);
	const minutes = Math.trunc((hoursDecimal - hours) * 60);
	return `${hours}ч, ${minutes}мин`;
}
