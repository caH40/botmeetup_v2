import mongoose from 'mongoose';
import pkg from 'mongoose';

const { Schema, model } = pkg;

const meetupSchema = new Schema({
	botId: { type: mongoose.Schema.Types.ObjectId, ref: 'BotSetup' },
	postedBy: { type: String },
	city: { type: String },
	cityWeather: { type: String },
	date: { type: Number }, //таймстамп старта (дата и время)
	distance: { type: Number },
	speed: { type: Number },
	difficultyLevel: { type: String },
	description: { type: String },
	photoId: { type: String },
});

export default model('Meetup', meetupSchema);
