// модель для создания кнопок Городов и мест мониторинга погоды
import pkg from 'mongoose';

const { Schema, model } = pkg;

const locationSchema = new Schema({
	name: { type: String, unique: true },
	weather: [{ type: String }],
});

export const Location = model('Location', locationSchema);
