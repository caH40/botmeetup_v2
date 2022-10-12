// модель для базы всех городов России
import pkg from 'mongoose';

const { Schema, model } = pkg;

const citySchema = new Schema({
	city: [{ type: Object }],
});

export const City = model('City', citySchema);
