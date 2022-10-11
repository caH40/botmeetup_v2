// модель для тикетов покупки бота
import pkg from 'mongoose';

const { Schema, model } = pkg;

const ticketSchema = new Schema({
	ownerId: { type: Number, unique: true },
	datePurchase: { type: Number },
	duration: { type: Number },
	isActive: { type: Boolean, default: false },
	isUsedTestPeriod: { type: Boolean, default: false },
	purchase: [{ type: Object }],
});

export const Ticket = model('Ticket', ticketSchema);
