import { Scenes } from 'telegraf';

import { setupMessage } from './texts.js';
import { apiWeather } from './api-weather.js';
import { updateSetupGroup } from '../controllers/update-setup.js';
import { configuration } from '../controllers/configuration.js';

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
setupScene.command('configuration', async ctx => configuration(ctx));
setupScene.command('updateDataGroup', async ctx => await updateSetupGroup(ctx));
setupScene.command('quit', leave('setup'));
setupScene.on('message', async ctx => await apiWeather(ctx));
