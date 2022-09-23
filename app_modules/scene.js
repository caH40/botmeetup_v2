import { Scenes } from 'telegraf';

const { leave } = Scenes.Stage;

export const cityScene = new Scenes.BaseScene('city');

cityScene.enter(async ctx => await ctx.reply('Now, You are in Scene City!'));
cityScene.leave(async ctx => await ctx.reply('Bye'));
cityScene.hears('quit', leave('city'));
cityScene.on('message', ctx => {
	ctx.reply('Вижу ваше сообщение в Сцене - ' + ctx.message.text);
});
