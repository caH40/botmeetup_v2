import { BotSetup } from '../model/BotSetup.js';
import { cityList } from '../weather/city-mylist.js';
import { getKeyboard } from './keyboard-get.js';
import { keyboardNewLocation, keyboardCityAbsent } from './keyboards.js';

export async function handlerCityMenu(ctx, cbqData) {
	console.log(cbqData); // for dev

	const botSetupDB = await BotSetup.find();
	if (!botSetupDB[0])
		return console.log(
			new Date().toLocaleString(),
			'в БД нет документов в коллекции BotSetup -',
			'module handler-city.js'
		);
	let citesDB = botSetupDB.city;

	if (cbqData === 'addLocation') {
		getKeyboard(
			ctx,
			'Выберите города для добавления в inline-клавиатуру',
			keyboardNewLocation(cityList)
		);
		console.log(keyboardNewLocation(cityList));
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
