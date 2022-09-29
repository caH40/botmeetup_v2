import { adminVerify } from '../app_modules/admin-verify.js';
import { cityList } from '../weather/city-mylist.js';
import { newLocation } from '../keyboards/keyboards.js';

//This is a scene for editing an array of cites
//создать функционал добавления/удаления городов (инлайн клавиатуры)
export function editCity(ctx) {
	try {
		// все города/места прописанные в файле city-mylist.js
		const keyboard = newLocation(cityList);
		// console.log('keyboard', keyboard);
	} catch (error) {
		console.log(error);
	}
}
