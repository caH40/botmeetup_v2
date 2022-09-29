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

	let citesDB = botSetupDB.city;
	citesDB ??= [];

	if (cbqData === 'addLocation') {
		// убираются города из клавиатуры которые есть в ДБ BotSetup
		const filteredCites = cityList.filter(city => !citesDB.includes(city.name));

		if (filteredCites.length == 0) {
			return await ctx.reply(
				'Вы добавили все имеющиеся города в настройки бота. Больше нечего добавлять.'
			);
		}

		const title = 'Выберите город для добавления в inline-клавиатуру';
		getKeyboard(ctx, title, keyboardAddNewLocation(filteredCites));
	}

	if (cbqData === 'removeLocation') {
		if (citesDB.length == 0) {
			return await ctx.reply('Вы удалили все города из настройки бота. Больше нечего удалять.');
		}

		const title = 'Выберите города которые необходимо удалить из inline-клавиатуры';
		getKeyboard(ctx, title, citesDB ? keyboardDeleteNewLocation(citesDB) : keyboardCityAbsent);
	}
	if (cbqData === 'keyboardCityAbsent') {
	}
}
