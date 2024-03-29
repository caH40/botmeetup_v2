import 'dotenv/config';
import { Scenes, session, Telegraf } from 'telegraf';
import mongoose from 'mongoose';

import { setup } from './controllers/setup.js';
import { updateGroup, updateChannel } from './controllers/update-setup.js';
import { start } from './controllers/start.js';
import { help } from './controllers/help.js';
import { rideOn } from './controllers/rideon.js';
import { callbackQuery } from './controllers/callback-query.js';

import { photoWizard, descriptionWizard } from './app_modules/wizard-scene.js';
import { controlMessage } from './controllers/controlMessage.js';
import { poll } from './controllers/poll.js';
import { editPost } from './controllers/edit.js';
import { getMyId } from './controllers/my-id.js';
import { getConfiguration } from './controllers/configuration.js';
import { helpAdmin } from './controllers/help-admin.js';
import { ticket } from './controllers/ticket.js';
import { getTestPost } from './controllers/testpost.js';

import { paidTicket } from './keyboards/small_handlers/ticket-paid.js';
import { addCityList } from './controllers/citylist-add.js';
import { setupScene } from './scenes/setup.js';
import { cityScene } from './scenes/cities.js';
import { weatherScene } from './scenes/weather.js';
import { timers } from './app_modules/timer.js';

mongoose.set('strictQuery', true); //в базе будут только данные которые есть в схеме
mongoose
  .connect(process.env.MONGODB)
  .then(() => {
    console.log('MongoDb connected..');
  })
  .catch((error) => {
    console.log(error);
  });

const bot = new Telegraf(process.env.BOT_TOKEN);

const stage = new Scenes.Stage([
  setupScene(),
  photoWizard(),
  descriptionWizard(),
  cityScene(),
  weatherScene(),
]);

bot.use(session());
bot.use(stage.middleware());

bot.on('pre_checkout_query', (ctx) => ctx.answerPreCheckoutQuery(true));
bot.on('successful_payment', async (ctx) => await paidTicket(ctx));
bot.command('start', async (ctx) => await start(ctx));
bot.command('help', async (ctx) => await help(ctx));
bot.command('helpadmin', async (ctx) => await helpAdmin(ctx));
bot.command('rideon', async (ctx) => await rideOn(ctx));
bot.command('edit', async (ctx) => await editPost(ctx));
bot.command('myid', async (ctx) => await getMyId(ctx));
bot.command('ticket', async (ctx) => await ticket(ctx));
bot.on('callback_query', async (ctx) => await callbackQuery(ctx));
bot.command('setup', async (ctx) => await setup(ctx));
bot.command('updategroup', async (ctx) => await updateGroup(ctx));
bot.command('updatechannel', async (ctx) => await updateChannel(ctx));
bot.command('config', async (ctx) => await getConfiguration(ctx));
bot.command('addcitylist', async (ctx) => await addCityList(ctx));
bot.command('testpost', async (ctx) => await getTestPost(ctx));
bot.on('poll_answer', async (ctx) => await poll(ctx));
bot.on('message', async (ctx) => await controlMessage(ctx));

bot.launch();
timers(bot);
// Enable graceful stop
// process.once('SIGINT', () => bot.stop('SIGINT'));
// process.once('SIGTERM', () => bot.stop('SIGTERM'));
