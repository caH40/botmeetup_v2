// меню дата
const daySec = 86400000;
const dateSecToday = () => {
	return new Date().getTime();
};

const createDayArr = () => {
	var dayArr = [];
	const days = {
		0: 'Вс.',
		1: 'Пн.',
		2: 'Вт.',
		3: 'Ср.',
		4: 'Чт.',
		5: 'Пт.',
		6: 'Сб.',
	};
	for (let i = 0; i < 12; i++) {
		let currentDay = new Date(dateSecToday() + daySec * i);
		dayArr.push(days[currentDay.getDay()] + ', ' + currentDay.toLocaleDateString());
	}
	return dayArr;
};
// меню время
const timesArr = [];
for (let h = 5; h < 20; h++) {
	for (let m = 0; m < 31; m = m + 30) {
		if (m === 0) {
			timesArr.push(`${h}:${m}0`);
		} else {
			timesArr.push(`${h}:${m}`);
		}
	}
}
// дистанция
const distanceArr = [
	'40км',
	'60км',
	'80км',
	'100км',
	'120км',
	'140км',
	'160км',
	'180км',
	'200км',
	'200+км',
	'300+км',
	'400+км',
];
// Средняя скорость
const speedArr = ['20км/ч', '25км/ч', '28км/ч', '30км/ч', '35км/ч', '40км/ч'];

export { createDayArr, timesArr, distanceArr, speedArr, dateSecToday, daySec };
