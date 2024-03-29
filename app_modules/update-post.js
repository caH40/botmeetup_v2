import { Post } from '../model/Post.js';
import { formFinalPostUpdate } from './forms.js';
import { isActualDate } from '../utility/utilites.js';
import { BotSetup } from '../model/BotSetup.js';

export async function updatePost(bot, postId) {
  try {
    //если необходимо обновить конкретный Пост, а не все Посты
    if (postId) {
      const postDB = await Post.findOne({ _id: postId });
      await editMessageTelegram(bot, postDB);

      return;
    }
    // обновление всех постов по таймауту
    const postsDB = await Post.find({ isLastUpdated: false });

    for (let index = 0; index < postsDB.length; index++) {
      await editMessageTelegram(bot, postsDB[index]);
    }
  } catch (error) {
    console.log(error);
  }
}

export async function updatePhoto(ctx, post) {
  try {
    const botSetupDB = await BotSetup.findOne({ ownerId: post.userId });
    if (!botSetupDB)
      return await ctx.reply('Не нашел настроек бота, обратитесь к админу @Aleksandr_BV');
    const { channelId } = botSetupDB;

    const formPostString = await formFinalPostUpdate(post);
    const messageId = post.messageId;
    const photoId = post.photoId;
    await ctx.telegram.editMessageMedia(
      channelId,
      messageId,
      {},
      { type: 'photo', media: photoId, caption: formPostString, parse_mode: 'html' }
    );
  } catch (error) {
    console.log(error);
  }
}

async function editMessageTelegram(bot, post) {
  try {
    const formPostString = await formFinalPostUpdate(post);

    const botSetupDB = await BotSetup.findOne({ _id: post.botId });
    if (!botSetupDB)
      return console.log(
        `Не нашел настроек бота, ${post.botId}, похоже бот удалялся, а у нового другой _id`
      );
    const { channelId } = botSetupDB;

    await bot.telegram
      .editMessageCaption(channelId, post.messageId, 'привет!', formPostString, {
        parse_mode: 'html',
      })
      .catch((_) => true);

    let date = post.date;
    let time = post.time;
    //это последнее обновление поста
    if (!isActualDate(date, time)) {
      await Post.findOneAndUpdate({ _id: post }, { $set: { isLastUpdated: true } });
    }
  } catch (error) {
    console.log(error);
  }
}
