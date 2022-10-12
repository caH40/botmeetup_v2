// модель для базы всех городов России
import pkg from 'mongoose';

const { Schema, model } = pkg;

const citySchema = new Schema({
	name: { type: String },
	lon: { type: Number },
	lat: { type: Number },
});

export const City = model('City', citySchema);
