import { Scenes } from 'telegraf';

import { setupMessage } from './texts.js';
import { apiWeather } from './api-weather.js';
import { meetLocations_v2 } from '../keyboards/small_handlers/meet-location_v2.js';
import { meetWeather_v2 } from '../keyboards/small_handlers/meet-weather_v2.js';
import { getKeyboard } from '../keyboards/keyboard-get.js';
import { keyboardBack } from '../keyboards/keyboards.js';

const { leave } = Scenes.Stage;

//this scene edits the bot data
export const setupScene = () => {
	try {
		const setupSceneConst = new Scenes.BaseScene('setup');
		setupSceneConst.enter(
			async ctx => await ctx.reply(setupMessage, { disable_web_page_preview: true })
		);
		setupSceneConst.leave(async ctx => await ctx.reply('До свидания!'));
		setupSceneConst.command('quit', leave('setup'));
		setupSceneConst.on('text', async ctx => await apiWeather(ctx));
		return setupSceneConst;
	} catch (error) {
		console.log(error);
	}
};

export const cityScene = () => {
	try {
		const cityScene = new Scenes.BaseScene('city');
		cityScene.enter(
			async ctx =>
				await ctx.reply(
					`Выбор места старта заезда.\nВведите первые буквы города (на латинице). Сформируется список кнопок с городами, согласно заданному поиску.`
				)
		);
		cityScene.command('quit', leave('city'));
		cityScene.on('text', async ctx => await meetLocations_v2(ctx));
		return cityScene;
	} catch (error) {
		console.log(error);
	}
};

export const weatherScene = () => {
	try {
		const weatherScene = new Scenes.BaseScene('weather');

		weatherScene.enter(async ctx => {
			const locationStart = ctx.session.locationStart;
			if (!locationStart) {
				await getKeyboard(
					ctx,
					'Сначала необходимо выбрать место старта.',
					keyboardBack('Вернутся в главное меню', 'meetEdit_')
				);
				return;
			}

			await ctx.reply(
				`Выбор места наблюдения за погодой при старте из <b>${locationStart}</b>. Ведите первые буквы города (английские названия). Сформируется список кнопок с городами, согласно заданному поиску.`,
				{ parse_mode: 'html' }
			);
		});

		weatherScene.command('quit', leave('weather'));
		weatherScene.on('text', async ctx => await meetWeather_v2(ctx));
		return weatherScene;
	} catch (error) {
		console.log(error);
	}
};
