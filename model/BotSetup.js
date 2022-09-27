// настройки для определенного канала
import pkg from 'mongoose';
const { Schema, model } = pkg;

const BotSetupSchema = new Schema({
	channelOwnerId: { type: Number },
	channelId: { type: Number, unique: true },
	channelTitle: { type: String },
	channelName: { type: String },
	groupId: { type: Number, unique: true },
	groupTitle: { type: String },
	city: [{ type: String }],
	apiKeyWeather: { type: String },
});

export const BotSetup = model('BotSetup', BotSetupSchema);
