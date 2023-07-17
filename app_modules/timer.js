import { weatherFromApi } from '../weather/weather-api.js';
import { weatherUpdate } from '../weather/weather-update.js';
import { updatePost } from './update-post.js';
import { updateTickets } from './update-ticket.js';

export function timers(bot) {
  try {
    const millisecondsInHour = 3600000;
    const millisecondsIMinute = 60000;
    // bot.telegram.sendMessage(process.env.MY_TELEGRAM_ID, 'restart...');
    setInterval(async () => {
      //запуск таймера обновления данных о погоде в день старта заезда
      await weatherFromApi();
      await updateTickets();
      //получение данных о погоде
      await weatherUpdate(bot);
    }, millisecondsInHour);
    setInterval(async () => {
      //обновление постов на канале
      await updatePost(bot);
    }, millisecondsIMinute);
  } catch (error) {
    console.log(error);
  }
}
