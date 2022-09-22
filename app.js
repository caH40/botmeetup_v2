import 'dotenv/config';
import { Telegraf } from 'telegraf';

import { editCity } from './app_modules/city.js';
import { start } from './app_modules/start.js';

const bot = new Telegraf(process.env.BOT_TOKEN);

bot.command('/start', async ctx => start(ctx));
// bot.command('/help', async ctx => help(ctx));
// bot.command('/rideOn', async ctx => rideOn(ctx));
// bot.command('/rating', async ctx => rating(ctx));
// bot.command('/delete', async ctx => deletePost(ctx));
bot.command('/city', async ctx => editCity(ctx));

bot.launch();

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
