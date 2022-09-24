// Данные из сообщения Телеграм
import mongoose from 'mongoose';
import pkg from 'mongoose';

const { Schema, model } = pkg;

const postSchema = new Schema({
	botId: { type: mongoose.Schema.Types.ObjectId, ref: 'BotSetup' },
	channelId: { type: Number },
	dateM: { type: String },
	timeM: { type: String },
	creatM: { type: String },
	locationsM: { type: String },
	distanceM: { type: String },
	levelM: { type: String },
	speedM: { type: String },
	photoId: { type: String },
	description: { type: String },
});

export default model('Post', postSchema);
