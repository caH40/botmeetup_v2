import { Scenes } from 'telegraf';

import { setupMessage } from './texts.js';
import { apiWeather } from './api-weather.js';
import { getConfiguration } from '../controllers/configuration.js';

const { leave } = Scenes.Stage;

//this is a scene for editing an array of cities
export const cityScene = new Scenes.BaseScene('city');
cityScene.enter(async ctx => await ctx.reply('Now, You are in Scene City!'));
cityScene.leave(async ctx => await ctx.reply('Bye'));
cityScene.hears('quit', leave('city'));
cityScene.on('message', ctx => {
	ctx.reply('Вижу ваше сообщение в Сцене - ' + ctx.message.text);
});

//this scene edits the bot data
export const setupScene = new Scenes.BaseScene('setup');
setupScene.enter(async ctx => await ctx.reply(setupMessage, { disable_web_page_preview: true }));
setupScene.leave(async ctx => await ctx.reply('До свидания!'));
setupScene.command('configuration', async ctx => getConfiguration(ctx));
setupScene.command('quit', leave('setup'));
setupScene.on('text', async ctx => await apiWeather(ctx));
