// модель для создания кнопок Городов и мест мониторинга погоды
import mongoose from 'mongoose';
import pkg from 'mongoose';

const { Schema, model } = pkg;

const locationSchema = new Schema({
	botId: { type: mongoose.Schema.Types.ObjectId, ref: 'BotSetup' },
	name: { type: String, unique: true },
	weather: [{ type: String }],
});

export const Location = model('Location', locationSchema);
