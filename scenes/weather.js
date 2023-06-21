import { Scenes } from 'telegraf';
import { meetWeather_v2 } from '../keyboards/small_handlers/meet-weather_v2.js';
import { getKeyboard } from '../keyboards/keyboard-get.js';
import { keyboardBack } from '../keyboards/keyboards.js';

const { leave } = Scenes.Stage;

export const weatherScene = () => {
  try {
    const weatherScene = new Scenes.BaseScene('weather');

    weatherScene.enter(async (ctx) => {
      const locationStart = ctx.session.locationStart;
      if (!locationStart) {
        await getKeyboard(
          ctx,
          'Сначала необходимо выбрать место старта.',
          keyboardBack('Вернутся в главное меню', 'meetEdit_')
        );
        return;
      }

      await ctx.reply(
        `Выбор места наблюдения за погодой при старте из <b>${locationStart}</b>. Ведите первые буквы города (английские названия). Сформируется список кнопок с городами, согласно заданному поиску.`,
        { parse_mode: 'html' }
      );
    });

    weatherScene.command('quit', leave('weather'));
    weatherScene.on('text', async (ctx) => await meetWeather_v2(ctx));
    return weatherScene;
  } catch (error) {
    console.log(error);
  }
};
