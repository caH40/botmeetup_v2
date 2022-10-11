import { Ticket } from '../../model/Ticket.js';
import { dateExpired } from '../../utility/utilites.js';

export async function titleMenu(ownerId) {
	const ticketDB = await Ticket.findOne({ ownerId });

	if (!ticketDB)
		return `Меню для работы с подпиской на бота BotMeetUp для каналов о велозаездах.
    \nУ вас нет оплаченного тикета.`;
	if (ticketDB.isActive)
		return `Меню для работы с подпиской на бота BotMeetUp для каналов о велозаездах.
    \nВаш тикет действителен до: ${dateExpired(ticketDB)}`;
	if (!ticketDB.isActive)
		return `Меню для работы с подпиской на бота BotMeetUp для каналов о велозаездах.
    \nОплаченный период тикета закончился: ${dateExpired(ticketDB)}`;
}
