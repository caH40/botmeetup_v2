import pkg from 'mongoose';
const { Schema, model } = pkg;

const meetupSchema = new Schema({
	city: [{ type: String }],
});

export default model('Meetup', meetupSchema);
