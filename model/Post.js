// Данные из сообщения Телеграм
import mongoose from 'mongoose';
import pkg from 'mongoose';

const { Schema, model } = pkg;

const postSchema = new Schema({
	botId: { type: mongoose.Schema.Types.ObjectId, ref: 'BotSetup' },
	channelId: { type: Number },
	date: { type: String },
	time: { type: String },
	leader: { type: String },
	locationStart: { type: String },
	distance: { type: String },
	level: { type: String },
	speed: { type: String },
	photoId: { type: String },
	description: { type: String },
	messageId: { type: Number },
	messageIdGroup: { type: Number },
	poll: { type: Object },
	locationWeather: { type: String },
	//кто проголосовал за ответ "ДА"
	pollUsers: [{ type: Object }],

	pollQuantity: { type: Number, default: 0 },
});

export const Post = model('Post', postSchema);
