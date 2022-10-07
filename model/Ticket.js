// модель для тикетов покупки бота
import pkg from 'mongoose';

const { Schema, model } = pkg;

const locationSchema = new Schema({
	ownerId: { type: Number },
	datePurchase: { type: Number },
	duration: { type: Number },
	isActive: { type: Boolean, default: false },
});

export const Location = model('Location', locationSchema);
