import {
	creatDayArr,
	timesArr,
	distanceArr,
	speedArr,
	levelArr,
	locations,
	locationsWeather,
} from './buttons.js';

const keyboardMain = [
	[
		{ text: 'Дата заезда', callback_data: 'meetDate' },
		{ text: 'Время старта', callback_data: 'meetTime' },
	],
	[
		{ text: 'Место старта', callback_data: 'meetLocation' },
		{ text: 'Дистанция, км', callback_data: 'meetDistance' },
	],
	[
		{ text: 'Средняя скорость', callback_data: 'meetSpeed' },
		{ text: 'Погода', callback_data: 'meetWeather' },
		// { text: 'Сложность заезда', callback_data: 'meetLevel' },
	],
	[
		{ text: 'Картинка', callback_data: 'meetCover' },
		{ text: 'Описание', callback_data: 'meetDescription' },
	],
	[{ text: 'Сводные данные по заезду', callback_data: 'meetSummary' }],
];
function getKeyboardDays() {
	let date = [];
	const days = creatDayArr();
	for (let i = 0; i < 12; i = i + 2) {
		date.push([
			{ text: days[i], callback_data: days[i] },
			{ text: days[i + 1], callback_data: days[i + 1] },
		]);
	}
	return date;
}
const keyboardMeetingTimes = [];
for (let i = 0; i < timesArr.length; i = i + 6) {
	keyboardMeetingTimes.push([
		{ text: timesArr[i], callback_data: timesArr[i] },
		{ text: timesArr[i + 1], callback_data: timesArr[i + 1] },
		{ text: timesArr[i + 2], callback_data: timesArr[i + 2] },
		{ text: timesArr[i + 3], callback_data: timesArr[i + 3] },
		{ text: timesArr[i + 4], callback_data: timesArr[i + 4] },
		{ text: timesArr[i + 5], callback_data: timesArr[i + 5] },
	]);
}

function keyboardAddNewLocation(cityList) {
	const keyboardLocations = [];
	for (let i = 0; i < cityList.length; i = i + 2) {
		if (!cityList[i + 1]) {
			cityList[i + 1] = {};
			cityList[i + 1].name = 'Пустая кнопка';
		}
		keyboardLocations.push([
			{ text: cityList[i].name, callback_data: 'addNewLocation_' + cityList[i].name },
			{ text: cityList[i + 1].name, callback_data: 'addNewLocation_' + cityList[i + 1].name },
		]);
	}
	return keyboardLocations;
}

function keyboardDeleteNewLocation(cityList) {
	const keyboardLocations = [];
	for (let i = 0; i < cityList.length; i = i + 2) {
		if (!cityList[i + 1]) {
			cityList[i + 1] = 'Пустая кнопка';
		}
		keyboardLocations.push([
			{ text: cityList[i], callback_data: 'deleteNewLocation_' + cityList[i] },
			{ text: cityList[i + 1], callback_data: 'deleteNewLocation_' + cityList[i + 1] },
		]);
	}
	return keyboardLocations;
}

const keyboardAddOrDel = [
	[
		{ text: 'Добавление города', callback_data: 'addLocation' },
		{ text: 'Удаление города', callback_data: 'removeLocation' },
	],
	// [{ text: 'Выход из редактирования', callback_data: 'quitEditLocation' }],
];

const keyboardCityAbsent = [
	[{ text: 'В базе нет городов. Выход.', callback_data: 'quitEditLocation' }],
];

const keyboardLocations = [];
for (let i = 0; i < locations.length; i = i + 2) {
	keyboardLocations.push([
		{ text: locations[i], callback_data: locations[i] },
		{ text: locations[i + 1], callback_data: locations[i + 1] },
	]);
}
const keyboardLocationsWeather = [];
for (let i = 0; i < locations.length; i = i + 2) {
	keyboardLocationsWeather.push([
		{ text: locationsWeather[i], callback_data: locationsWeather[i] },
		{ text: locationsWeather[i + 1], callback_data: locationsWeather[i + 1] },
	]);
}
const keyboardDistances = [];
for (let i = 0; i < 12; i = i + 4) {
	keyboardDistances.push([
		{ text: distanceArr[i], callback_data: distanceArr[i] },
		{ text: distanceArr[i + 1], callback_data: distanceArr[i + 1] },
		{ text: distanceArr[i + 2], callback_data: distanceArr[i + 2] },
		{ text: distanceArr[i + 3], callback_data: distanceArr[i + 3] },
	]);
}
const keyboardSpeed = [
	[
		{ text: speedArr[0], callback_data: speedArr[0] },
		{ text: speedArr[1], callback_data: speedArr[1] },
		{ text: speedArr[2], callback_data: speedArr[2] },
	],
	[
		{ text: speedArr[3], callback_data: speedArr[3] },
		{ text: speedArr[4], callback_data: speedArr[4] },
		{ text: speedArr[5], callback_data: speedArr[5] },
	],
];
const keyboardDifficulty = [
	[
		{ text: levelArr[0], callback_data: levelArr[0] },
		{ text: levelArr[1], callback_data: levelArr[1] },
		{ text: levelArr[2], callback_data: levelArr[2] },
	],
	[
		{ text: levelArr[3], callback_data: levelArr[3] },
		{ text: levelArr[4], callback_data: levelArr[4] },
		{ text: levelArr[5], callback_data: levelArr[5] },
	],
];
// сводные данных по заезду
const keyboardSummary = [
	[
		{ text: 'Опубликовать', callback_data: 'meetSend' },
		{ text: 'Редактировать', callback_data: 'meetEdit' },
	],
];
// для проверки заполнения ячеек
const keyboardBack = [[{ text: 'Продолжить ввод данных', callback_data: 'meetEdit' }]];
// формируем инлайн клавиатуру из отфильтрованных элементов, вырезая необходимую информацию и значения message.text
function getKeyboardForDelPost(messageFromDb) {
	let keyboardForDelPost = [];
	for (let i = 0; i < messageFromDb.length; i++) {
		let clearMessage = messageFromDb[i].messageChannel.caption;
		clearMessage =
			clearMessage.match(/\d{1,2}.\d\d.\d\d\d\d/) +
			', ' +
			clearMessage.match(/\d{1,2}:\d\d/) +
			', ' +
			clearMessage.match(/Место старта: ([^\n]*)/)[1] +
			', ' +
			clearMessage.match(/Дистанция: ([^\n]*)/)[1];
		keyboardForDelPost.push([
			{ text: clearMessage, callback_data: `ffmi${messageFromDb[i].messageChannel.message_id}` },
		]);
	}
	return keyboardForDelPost;
}

export {
	keyboardMain,
	getKeyboardDays,
	keyboardLocations,
	keyboardLocationsWeather,
	keyboardMeetingTimes,
	keyboardDistances,
	keyboardSpeed,
	keyboardDifficulty,
	keyboardSummary,
	keyboardBack,
	getKeyboardForDelPost,
	keyboardAddNewLocation,
	keyboardDeleteNewLocation,
	keyboardAddOrDel,
	keyboardCityAbsent,
};
