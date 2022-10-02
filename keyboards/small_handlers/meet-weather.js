import { Location } from '../../model/Location.js';
import { getKeyboard } from '../keyboard-get.js';
import { keyboardBack, keyboardLocationsWeather } from '../keyboards.js';

export async function meetWeather(ctx, cbqData) {
	const locationStart = ctx.session.locationStart;
	if (!locationStart) {
		await getKeyboard(
			ctx,
			'Сначала необходимо выбрать место старта.',
			keyboardBack('Вернутся в главное меню', 'meetEdit_')
		);

		return;
	}
	const { weather } = await Location.findOne({ name: ctx.session.locationStart });
	if (weather.length == 0) {
		await ctx.reply(`Нет мест мониторинга для места старта ${locationStart}`);
	}
	getKeyboard(
		ctx,
		`Выберите место погоды для старта из <b>${locationStart}</b>`,
		keyboardLocationsWeather(weather, 'weather_')
	);
}
