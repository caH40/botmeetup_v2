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
	let dateNewFormat = [dateArr[1], dateArr[0], dateArr[2]].join('.');
	let dateMilliseconds = new Date(dateNewFormat).getTime() + lag;
	let todayMilliseconds = new Date().getTime();

	return dateMilliseconds > todayMilliseconds;
}
