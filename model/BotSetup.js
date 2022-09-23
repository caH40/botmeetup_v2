// настройки для определенного канала
import pkg from 'mongoose';
const { Schema, model } = pkg;

const BotSetupSchema = new Schema({
	channelId: { type: Number, unique: true },
	channelName: { type: String },
	channelTitle: { type: String },
	groupId: { type: Number, unique: true },
	groupName: { type: String },
	groupTitle: { type: String },
	city: [{ type: String }],
});

export default model('BotSetup', BotSetupSchema);
