import { Scenes } from 'telegraf';

const { leave } = Scenes.Stage;

import { meetLocations_v2 } from '../keyboards/small_handlers/meet-location_v2.js';

export const cityScene = () => {
  try {
    const cityScene = new Scenes.BaseScene('city');
    cityScene.enter(
      async (ctx) =>
        await ctx.reply(
          `Выбор места старта заезда.\nВведите первые буквы города (на латинице). Сформируется список кнопок с городами, согласно заданному поиску.`
        )
    );
    cityScene.command('quit', leave('city'));
    cityScene.on('text', async (ctx) => await meetLocations_v2(ctx));
    return cityScene;
  } catch (error) {
    console.log(error);
  }
};
