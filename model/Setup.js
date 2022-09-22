// настройки для определенного канала
import pkg from 'mongoose';
const { Schema, model } = pkg;

const setupSchema = new Schema({
	channelId: { type: Number, unique: true },
	city: [{ type: String }],
});

export default model('Setup', setupSchema);
