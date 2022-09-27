// модель для создания кнопок Городов и мест мониторинга погоды
// import mongoose from 'mongoose';
import pkg from 'mongoose';

const { Schema, model } = pkg;

const citySchema = new Schema({
	city: [String],
});

export const City = model('City', citySchema);
