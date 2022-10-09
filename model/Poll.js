// модель для создания кнопок Городов и мест мониторинга погоды
import mongoose from 'mongoose';
import pkg from 'mongoose';

const { Schema, model } = pkg;

const pollSchema = new Schema({
	postId: { type: mongoose.Schema.Types.ObjectId, ref: 'Post' },
	poll: { type: Object },
	//кто проголосовал за ответ "ДА"
	pollUsers: [{ type: Object }],
	pollQuantity: { type: Number, default: 0 },
});

export const Poll = model('Poll', pollSchema);
