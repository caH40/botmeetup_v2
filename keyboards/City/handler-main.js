import { BotSetup } from '../../model/BotSetup.js';
import { cityList } from '../../weather/city-mylist.js';
import { getKeyboard } from '../keyboard-get.js';
import {
	keyboardAddNewLocation,
	keyboardCityAbsent,
	keyboardDeleteNewLocation,
} from '../keyboards.js';

export async function handlerMainCityMenu(ctx, cbqData) {
	const botSetupDB = await BotSetup.findOne();
	if (!botSetupDB)
		return console.log(
			new Date().toLocaleString(),
			'в БД нет документов в коллекции BotSetup -',
			'module handler-city.js'
		);

	let citiesDB = botSetupDB.city;
	citiesDB ??= [];

	if (cbqData === 'addLocation') {
		// убираются города из клавиатуры которые есть в ДБ BotSetup
		const filteredCities = cityList.filter(city => !citiesDB.includes(city.name));

		if (filteredCities.length == 0) {
			return await ctx.reply(
				'Вы добавили все имеющиеся города в настройки бота. Больше нечего добавлять.'
			);
		}

		const title = 'Выберите город для добавления в inline-клавиатуру';
		getKeyboard(ctx, title, keyboardAddNewLocation(filteredCities));
	}

	if (cbqData === 'removeLocation') {
		if (citiesDB.length == 0) {
			return await ctx.reply('Вы удалили все города из настройки бота. Больше нечего удалять.');
		}

		const title = 'Выберите города которые необходимо удалить из inline-клавиатуры';
		getKeyboard(ctx, title, citiesDB ? keyboardDeleteNewLocation(citiesDB) : keyboardCityAbsent);
	}
	if (cbqData === 'keyboardCityAbsent') {
		console.log('keyboardCityAbsent, module - handler-main cities');
	}
}
