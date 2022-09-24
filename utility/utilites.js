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
