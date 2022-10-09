// Данные из сообщения Телеграм
import mongoose from 'mongoose';
import pkg from 'mongoose';

const { Schema, model } = pkg;

const postSchema = new Schema({
	botId: { type: mongoose.Schema.Types.ObjectId, ref: 'BotSetup' },
	date: { type: String },
	time: { type: String },
	leader: { type: String },
	userId: { type: String },
	locationStart: { type: String },
	locationWeather: { type: String },
	distance: { type: String },
	speed: { type: String },
	photoId: { type: String },
	description: { type: String },
	messageId: { type: Number },
	messageIdGroup: { type: Number },
	messageIdWeather: { type: Number },
	//погода: температура днем, влажность, описание
	tempDay: { type: String },
	humidity: { type: String },
	descriptionWeather: { type: String },
	isLastUpdated: { type: Boolean },
	isPattern: { type: Boolean, default: true },
});

export const Post = model('Post', postSchema);
