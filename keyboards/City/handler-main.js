import { BotSetup } from '../../model/BotSetup.js';
import { cityList } from '../../weather/city-mylist.js';
import { getKeyboard } from '../keyboard-get.js';
import { keyboardNewLocation, keyboardCityAbsent, keyboardAddOrDel } from '../keyboards.js';

export async function handlerMainCityMenu(ctx, cbqData) {
	// console.log(cbqData); // for dev

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
			return await ctx.reply('Вы добавили все имеющиеся города в БД. Больше нечего добавлять.');
		}

		getKeyboard(
			ctx,
			'Выберите город для добавления в inline-клавиатуру',
			keyboardNewLocation(filteredCites)
		);
	}

	if (cbqData === 'removeLocation') {
		getKeyboard(
			ctx,
			'Выберите города которые необходимо удалить из inline-клавиатуры',
			citesDB ? keyboardNewLocation(citesDB) : keyboardCityAbsent
		);
	}
	if (cbqData === 'keyboardCityAbsent') {
	}
}
