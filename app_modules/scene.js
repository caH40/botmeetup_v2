import { Scenes } from 'telegraf';

import { setupMessage } from './texts.js';
import { apiWeather } from './api-weather.js';

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
