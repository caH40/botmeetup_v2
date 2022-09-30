import { BotSetup } from '../../model/BotSetup.js';
import { Location } from '../../model/Location.js';
import { cityList } from '../../weather/city-mylist.js';
import { getKeyboard } from '../keyboard-get.js';
import {
	keyboardAddNewLocation,
	keyboardCityAbsent,
	keyboardDeleteNewLocation,
} from '../keyboards.js';

export async function handlerMainMenuLocation(ctx, cbqData) {
	//обработка меню добавление/удаление городов
	const locationsDB = await Location.find();
	//массив с именами мест старта из БД
	const locationsName = [];
	//=================================================================================
	if (cbqData === 'addLocation') {
		// убираются города из клавиатуры которые есть в ДБ BotSetup
		locationsDB.forEach(location => locationsName.push(location.name));
		const filteredLocationsName = cityList.filter(city => !locationsName.includes(city.name));

		if (filteredLocationsName.length == 0) {
			return await ctx.reply(
				'Вы добавили все имеющиеся города в настройки бота. Больше нечего добавлять.'
			);
		}

		const title = 'Выберите место старта для добавления в inline-клавиатуру';
		getKeyboard(ctx, title, keyboardAddNewLocation(filteredLocationsName));
	}
	//=================================================================================
	if (cbqData === 'removeLocation') {
		if (locationsDB.length == 0) {
			return await ctx.reply(
				'Вы удалили все места старта из настройки бота. Больше нечего удалять.'
			);
		}

		const title = 'Выберите место старта которое необходимо удалить из inline-клавиатуры';
		getKeyboard(
			ctx,
			title,
			citiesDB ? keyboardDeleteNewLocation(locationsDB, 'deleteNewLocation_') : keyboardLocation
		);
	}
	//=================================================================================
	if (cbqData === 'keyboardCityAbsent') {
		console.log('keyboardCityAbsent, module - handler-main cities');
	}
}
