import { adminVerify } from '../app_modules/admin-verify.js';
import { cityList } from '../weather/city-mylist.js';
import { newLocation } from '../keyboards/keyboards.js';
import { getKeyboard } from '../keyboards/keyboard-get.js';

//This is a scene for editing an array of cites
//создать функционал добавления/удаления городов (инлайн клавиатуры)
export async function editCity(ctx) {
	try {
		// все города/места прописанные в файле city-mylist.js
		const keyboard = newLocation(cityList);
		await getKeyboard(ctx, 'Добавление городов в БД', keyboard);

		// console.log('keyboard', keyboard);
	} catch (error) {
		console.log(error);
	}
}
