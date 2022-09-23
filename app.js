import 'dotenv/config';
import { Scenes, session, Telegraf } from 'telegraf';

import { editCity } from './app_modules/city.js';
import { start } from './app_modules/start.js';
import { help } from './app_modules/help.js';

import { cityScene } from './app_modules/scene.js';

const bot = new Telegraf(process.env.BOT_TOKEN);

const stage = new Scenes.Stage([cityScene]);

bot.use(session());
bot.use(stage.middleware());

bot.command('/start', async ctx => await start(ctx));
bot.command('/help', async ctx => await help(ctx));
// bot.command('/rideOn', async ctx => await rideOn(ctx));
// bot.command('/rating', async ctx => await rating(ctx));
// bot.command('/delete', async ctx => await deletePost(ctx));
// bot.command('/setup', async ctx => await setup(ctx));
bot.command('/city', async ctx => await editCity(ctx));
// bot.on('callback_query', async ctx => await callbackQuery(ctx));

bot.launch();

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
