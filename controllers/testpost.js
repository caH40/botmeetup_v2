import { chatsMember } from '../app_modules/chat-member.js';
import { posted } from '../app_modules/texts.js';
import { Post } from '../model/Post.js';
import { weatherFromApi } from '../weather/weather-api.js';
import { weatherUpdate } from '../weather/weather-update.js';

export async function getTestPost(ctx) {
	try {
		const isAdmin = await chatsMember(ctx, 'isAdmin');
		if (!isAdmin) return;

		const userName = ctx.update.message.from.username;
		const userId = ctx.update.message.from.id;
		ctx.session.leader = '@' + userName;
		ctx.session.userId = userId;
		ctx.session.botId = ctx.session.botId;
		ctx.session.date = 'Воскресенье, 20.10.2022';
		ctx.session.time = '12:30';
		ctx.session.leader = '@moon_darklight';
		ctx.session.userId = '5085956560';
		ctx.session.locationStart = 'Probuzhdeniye';
		ctx.session.locationWeather = 'Probuzhdeniye';
		ctx.session.distance = '200+км';
		ctx.session.speed = '25км/ч';
		ctx.session.photoId =
			'AgACAgIAAxkBAAJZ3mNCgmmUqC9B96OLCG2RyU8XOHDWAAIswDEbcbMRSlOudxDYuAQTAQADAgADeAADKgQ';
		ctx.session.description =
			'Начинаем спокойно, постепенно прибавляя, а дальше валим на все деньги!';

		const finalPost = `${ctx.session.description ?? 'Детали заезда:'}\n<b>Место старта:</b> ${
			ctx.session.locationStart ?? '---'
		};\n<b>Дата заезда:</b> ${ctx.session.date ?? '---'};\n<b>Время старта:</b> ${
			ctx.session.time ?? '---'
		};\n<b>Дистанция:</b> ${ctx.session.distance ?? '---'};\n<b>Tемп:</b> ${
			ctx.session.speed ?? '---'
		};\n<b>Погода (${ctx.session.locationWeather ?? '---'}):</b>\n<b>Организатор заезда:</b> ${
			ctx.session.leader
		}`;

		const messageChannel = await ctx.telegram.sendPhoto(
			ctx.session.channelId,
			'AgACAgIAAxkBAAJZ3mNCgmmUqC9B96OLCG2RyU8XOHDWAAIswDEbcbMRSlOudxDYuAQTAQADAgADeAADKgQ',
			{
				caption: finalPost,
				parse_mode: 'html',
			}
		);

		const postMessage = posted(ctx.session.channelName);
		await ctx.reply(postMessage);
		//номер сообщения в канале
		const messageId = messageChannel.message_id;

		const post = new Post({
			botId: ctx.session.botId,
			date: ctx.session.date,
			time: ctx.session.time,
			leader: ctx.session.leader,
			userId: ctx.session.userId,
			locationStart: ctx.session.locationStart,
			locationWeather: ctx.session.locationWeather,
			distance: ctx.session.distance,
			speed: ctx.session.speed,
			photoId: ctx.session.photoId,
			description: ctx.session.description,
			messageId,
			isLastUpdated: false,
		});

		await post.save();
		await weatherFromApi();
		await weatherUpdate(ctx);
	} catch (error) {
		console.log(error);
	}
}
