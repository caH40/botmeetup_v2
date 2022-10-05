import { ownerVerify } from '../app_modules/owner-verify.js';
import { getKeyboard } from '../keyboards/keyboard-get.js';
import { keyboardLocation } from '../keyboards/keyboards.js';
import { Location } from '../model/Location.js';

export async function editLocationsWeather(ctx) {
	try {
		ctx.session.messageDel = [];
		const isOwner = await ownerVerify(ctx);
		if (!isOwner) return await ctx.reply('Команда доступна только владельцу канала.');

		const locationsDB = await Location.find();
		await getKeyboard(
			ctx,
			'Выберите место старта для редактирования его массива мест мониторинга погоды:',
			keyboardLocation(locationsDB, 'locationStart_')
		);
	} catch (error) {
		console.log(error);
	}
}
