import { Ticket } from '../model/Ticket.js';

export async function updateTickets() {
	try {
		const ticketsDB = await Ticket.find();

		ticketsDB.forEach(async ticket => {
			const today = new Date().getTime();
			const isActive = ticket.datePurchase + ticket.duration - today > 0;
			await Ticket.findOneAndUpdate({ _id: ticket._id }, { $set: { isActive } });
		});
	} catch (error) {
		console.log(error);
	}
}
