// Данные из сообщения Телеграм
import mongoose from 'mongoose';
import pkg from 'mongoose';

const { Schema, model } = pkg;

const messageSchema = new Schema({
	botId: { type: mongoose.Schema.Types.ObjectId, ref: 'BotSetupUser' },
	channelId: { type: Number, unique: true },
});

export default model('Message', messageSchema);
