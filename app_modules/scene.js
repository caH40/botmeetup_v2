import { Scenes } from 'telegraf';

import { setupMessage } from './texts.js';
import { apiWeather } from './api-weather.js';
import { meetLocation } from '../controllers/meetlocation.js';

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
		const citySceneConst = new Scenes.BaseScene('city');
		citySceneConst.enter(
			async ctx =>
				await ctx.reply('Ведите первые буквы города для города поиска в БД. Для выхода /quit')
		);
		citySceneConst.leave(async ctx => await ctx.reply('До свидания!'));
		// citySceneConst.leave(async ctx => await ctx.reply('До свидания!'));
		citySceneConst.command('quit', leave('city'));
		citySceneConst.on('text', async ctx => await meetLocation(ctx, ctx.message.text));
		return citySceneConst;
	} catch (error) {
		console.log(error);
	}
};
