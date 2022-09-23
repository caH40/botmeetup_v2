import { Scenes } from 'telegraf';
import { setupMessage } from './texts.js';

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
setupScene.command('quit', leave('setup'));
setupScene.command('test', async ctx => await ctx.reply('test'));
setupScene.on('message', async ctx => {
	const message = ctx.message.text;
	if (message.includes('API ') && message.length == 36) {
		await ctx.reply('Отлично, ключ сохранен в базе данных.');
	} else {
		await ctx.reply('Неверный формат ввода ключа, попробуйте еще.');
	}
});
