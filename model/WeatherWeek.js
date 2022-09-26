import pkg from 'mongoose';

const { Schema, model } = pkg;

const weatherWeekSchema = new Schema({
	list: {
		type: JSON,
	},
});

export const WeatherWeek = model('WeatherWeeks', weatherWeekSchema);
