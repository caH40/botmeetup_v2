import {
	createDayArr,
	timesArr,
	distanceArr,
	speedArr,
	levelArr,
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
	const days = createDayArr();
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

// ❗ универсальная клавиатура
function keyboardLocation(cityList, extendData) {
	const keyboardLocations = [];
	for (let i = 0; i < cityList.length; i = i + 2) {
		if (!cityList[i + 1]) {
			cityList[i + 1] = {};
			cityList[i + 1].name = '***';
		}
		keyboardLocations.push([
			{ text: cityList[i].name, callback_data: extendData + cityList[i].name },
			{ text: cityList[i + 1].name, callback_data: extendData + cityList[i + 1].name },
		]);
	}
	return keyboardLocations;
}

function keyboardWeatherRemove(cityList, extendData) {
	const keyboardLocations = [];
	for (let i = 0; i < cityList.length; i = i + 2) {
		if (!cityList[i + 1]) {
			cityList[i + 1] = '***';
		}
		keyboardLocations.push([
			{ text: cityList[i], callback_data: extendData + cityList[i] },
			{ text: cityList[i + 1], callback_data: extendData + cityList[i + 1] },
		]);
	}
	return keyboardLocations;
}

// ❗ универсальная клавиатура
function keyboardAddOrDel(action, extendData = '') {
	if (action === 'add') {
		return [[{ text: 'Добавление места', callback_data: 'addLocation' + extendData }]];
	}
	if (action === 'remove') {
		return [[{ text: 'Удаление места', callback_data: 'removeLocation' + extendData }]];
	}
	return [
		[
			{ text: 'Добавление места', callback_data: 'addLocation' + extendData },
			{ text: 'Удаление места', callback_data: 'removeLocation' + extendData },
		],
		// [{ text: 'Выход из редактирования', callback_data: 'quitEditLocation' }],
	];
}

const keyboardCityAbsent = [
	[{ text: 'В базе нет городов. Выход.', callback_data: 'quitEditLocation' }],
];

function keyboardMainLocations(cityList) {
	const keyboardLocations = [];
	for (let i = 0; i < cityList.length; i = i + 2) {
		if (!cityList[i + 1]) {
			cityList[i + 1] = {};
			cityList[i + 1].name = '***';
		}
		keyboardLocations.push([
			{ text: cityList[i].name, callback_data: 'mainLocation_' + cityList[i].name },
			{
				text: cityList[i + 1].name,
				callback_data: 'mainLocation_' + cityList[i + 1].name,
			},
		]);
	}
	return keyboardLocations;
}

function keyboardLocationsWeather(cityList, extendData) {
	const keyboardLocations = [];
	for (let i = 0; i < cityList.length; i = i + 2) {
		if (!cityList[i + 1]) {
			cityList[i + 1] = '***';
		}
		keyboardLocations.push([
			{ text: cityList[i], callback_data: extendData + cityList[i] },
			{ text: cityList[i + 1], callback_data: extendData + cityList[i + 1] },
		]);
	}
	return keyboardLocations;
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
		{ text: 'Редактировать', callback_data: 'meetEdit_back' },
	],
];
// кнопка назад
function keyboardBack(text, extendData) {
	return [[{ text, callback_data: extendData + 'back' }]];
}
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
	keyboardMainLocations,
	keyboardLocationsWeather,
	keyboardMeetingTimes,
	keyboardDistances,
	keyboardSpeed,
	keyboardDifficulty,
	keyboardSummary,
	keyboardBack,
	getKeyboardForDelPost,
	keyboardAddOrDel,
	keyboardCityAbsent,
	keyboardLocation,
	keyboardWeatherRemove,
};
