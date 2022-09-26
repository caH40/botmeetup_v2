import mongoose from 'mongoose';
import pkg from 'mongoose';

const { Schema, model } = pkg;

const weatherDaySchema = new Schema({
	postId: { type: mongoose.Schema.Types.ObjectId, ref: 'Post' },
	dateUpdate: String,
	date: String,
	dateString: String,
	city: String,
	tempMorn: String,
	tempDay: String,
	tempEve: String,
	humidity: String,
	windSpeed: String,
});

export const WeatherDay = model('WeatherDay', weatherDaySchema);
