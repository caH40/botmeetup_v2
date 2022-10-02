import { Location } from '../../model/Location.js';
import emptyButton from '../empty.js';
import { getKeyboard } from '../keyboard-get.js';
import { keyboardAddOrDel } from '../keyboards.js';

export async function handlerSubMenuLocation(ctx, cbqData) {
	//не выполнять ниже стоящий код, если нет нужных ключевых слов
	if (!(cbqData.includes('addLocationNew_') || cbqData.includes('removeLocationNew_'))) return;
	if (cbqData.includes('addLocationNew_***')) {
		await emptyButton.locationStart(ctx, cbqData);
		return;
	}

	if (cbqData.includes('addLocationNew_')) {
		const locationName = cbqData.slice(15);

		// проверка на дубликат документа
		const response = await Location.findOne({ name: locationName });
		if (response) return console.log('Документ с таким name уже есть в коллекции');

		const location = new Location({ name: locationName, weather: [locationName] });
		await location.save();
		const title = `Место старта <b>${locationName}</b> было добавлено. Выберите действие:`;
		await getKeyboard(ctx, title, keyboardAddOrDel());
	}

	if (cbqData.includes('removeLocationNew_')) {
		const locationName = cbqData.slice(18);
		await Location.findOneAndDelete({ name: locationName });
		const title = `Место старта <b>${locationName}</b> было удалено. Выберите действие:`;
		await getKeyboard(ctx, title, keyboardAddOrDel());
	}
}
