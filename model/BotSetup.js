// настройки для определенного канала
import pkg from 'mongoose';
const { Schema, model } = pkg;

const BotSetupSchema = new Schema({
	channelId: { type: Number, unique: true },
	groupId: { type: Number, unique: true },
	city: [{ type: String }],
});

export default model('BotSetup', BotSetupSchema);
