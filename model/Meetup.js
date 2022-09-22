import pkg from 'mongoose';
const { Schema, model } = pkg;

const meetupSchema = new Schema({
	postedBy: { type: String },
	city: { type: String },
	cityWeather: { type: String },
	date: { type: Number }, //таймстамп старта
	distance: { type: Number },
	speed: { type: Number },
	difficultyLevel: { type: String },
	description: { type: String },
	photoId: { type: String },
});

export default model('Meetup', meetupSchema);
