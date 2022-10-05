// настройки для определенного канала
import pkg from 'mongoose';
const { Schema, model } = pkg;

const botSetupSchema = new Schema({
	idForOne: { type: Number, default: 0, unique: true },
	channelOwnerId: { type: Number },
	channelId: { type: Number, unique: true },
	channelTitle: { type: String },
	channelName: { type: String },
	groupId: { type: Number, unique: true },
	groupTitle: { type: String },
	apiKeyWeather: { type: String },
});

export const BotSetup = model('BotSetup', botSetupSchema);
