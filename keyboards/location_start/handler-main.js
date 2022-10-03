import { Location } from '../../model/Location.js';
import { cityList } from '../../weather/city-mylist.js';
import { getKeyboard } from '../keyboard-get.js';
import { keyboardLocation, keyboardAddOrDel } from '../keyboards.js';

export async function handlerMainMenuLocation(ctx, cbqData) {
	try {
		//обработка меню добавление/удаление городов
		if (cbqData === 'addLocation') {
			const locationsDB = await Location.find();
			//массив с именами мест старта из БД
			const locationsName = [];
			// убираются города из клавиатуры которые есть в ДБ BotSetup
			locationsDB.forEach(location => locationsName.push(location.name));
			const filteredLocationsName = cityList.filter(city => !locationsName.includes(city.name));

			if (filteredLocationsName.length == 0) {
				await ctx.reply(
					'Вы добавили все имеющиеся города в настройки бота. Больше нечего добавлять.'
				);
				await getKeyboard(ctx, 'Выберите действие:', keyboardAddOrDel('remove'));
				return;
			}

			const title = 'Выберите место старта для добавления в inline-клавиатуру';
			getKeyboard(ctx, title, keyboardLocation(filteredLocationsName, 'addLocationNew_'));
		}
		if (cbqData === 'removeLocation') {
			const locationsDB = await Location.find();

			if (locationsDB.length == 0) {
				await ctx.reply('Вы удалили все места старта из настройки бота. Больше нечего удалять.');
				await getKeyboard(ctx, 'Выберите действие:', keyboardAddOrDel('add'));
				return;
			}

			const title = 'Выберите место старта которое необходимо удалить из inline-клавиатуры';
			getKeyboard(ctx, title, keyboardLocation(locationsDB, 'removeLocationNew_'));
		}
	} catch (error) {
		console.log(error);
	}
}
