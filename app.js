import 'dotenv/config';
import { Scenes, session, Telegraf } from 'telegraf';
import mongoose from 'mongoose';

import { setup } from './controllers/setup.js';
import { update } from './controllers/update-setup.js';
import { start } from './controllers/start.js';
import { help } from './controllers/help.js';
import { rideOn } from './controllers/rideon.js';
import { callbackQuery } from './controllers/callback-query.js';
import { setupScene } from './app_modules/scene.js';
import { photoWizard, descriptionWizard } from './app_modules/wizard-scene.js';
import { controlMessage } from './controllers/controlMessage.js';
import { poll } from './controllers/poll.js';
import { weatherFromApi } from './weather/weather-api.js';
import { weatherUpdate } from './weather/weather-update.js';
import { updatePost } from './app_modules/update-post.js';
import { editLocations } from './controllers/location.js';
import { editLocationsWeather } from './controllers/weather.js';
import { editPost } from './controllers/edit.js';
import { getMyId } from './controllers/my-id.js';
import { getConfiguration } from './controllers/configuration.js';
import { helpAdmin } from './controllers/help-admin.js';
import { ticket } from './controllers/ticket.js';

await mongoose
	.connect(process.env.MONGODB)
	.then(() => console.log('Connected to Mongo..'))
	.catch(error => console.log(error));

const bot = new Telegraf(process.env.BOT_TOKEN);

const stage = new Scenes.Stage([setupScene(), photoWizard(), descriptionWizard()]);

bot.use(session());
bot.use(stage.middleware());

bot.command('start', async ctx => await start(ctx));
bot.command('help', async ctx => await help(ctx));
bot.command('helpA', async ctx => await helpAdmin(ctx));
bot.command('rideon', async ctx => await rideOn(ctx));
// bot.command('/rating', async ctx => await rating(ctx));
bot.command('/edit', async ctx => await editPost(ctx));
bot.command('/myid', async ctx => await getMyId(ctx));
bot.command('location', async ctx => await editLocations(ctx));
bot.command('buyTicket', async ctx => await ticket(ctx));
bot.command('weather', async ctx => await editLocationsWeather(ctx));
bot.on('callback_query', async ctx => await callbackQuery(ctx));
bot.command('setup', async ctx => await setup(ctx));
bot.command('update', async ctx => await update(ctx));
bot.command('config', async ctx => await getConfiguration(ctx));
bot.on('poll_answer', async ctx => await poll(ctx));
bot.on('message', async ctx => await controlMessage(ctx));

bot.launch().then(() => {
	// bot.telegram.sendMessage(process.env.MY_TELEGRAM_ID, 'restart...');
	setInterval(async () => {
		//запуск таймера обновления данных о погоде в день старта заезда
		await weatherFromApi();
		//получение данных о погоде
		await weatherUpdate(bot);
	}, 3600000);
	setInterval(() => {
		//обновление постов на канале
		updatePost(bot);
	}, 60000);
});

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
