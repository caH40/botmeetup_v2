import { Ticket } from '../../model/Ticket.js';
import { dateExpired } from '../../utility/utilites.js';

export async function titleMenu(ownerId) {
	const ticketDB = await Ticket.findOne({ ownerId });
	const testStr =
		'<u>В данный момент происходит тестирование сервиса. Покупку необходимо осуществлять с тестовой карты: № 1111 1111 1111 1026, 12/22, CVC 000.</u>\nВыберите действие с подпиской на бота BotMeetUp для каналов о велозаездах.\n==============================\n';

	if (!ticketDB) return `${testStr}У вас нет оплаченного тикета.`;
	if (ticketDB.isActive) return `${testStr}Ваш тикет действителен до: ${dateExpired(ticketDB)}`;
	if (!ticketDB.isActive)
		return `${testStr}Оплаченный период тикета <u>закончился</u>: ${dateExpired(ticketDB)}`;
}
