import 'dotenv/config';
import { price } from './price.js';

export function getInvoice(userId, period) {
	const invoice = {
		// https://core.telegram.org/bots/api#payments
		chat_id: userId, // Уникальный идентификатор целевого чата или имя пользователя целевого канала
		provider_token: process.env.PROVIDER_TOKEN, // токен выданный через бот @SberbankPaymentBot
		start_parameter: 'get_access', //Уникальный параметр глубинных ссылок. Если оставить поле пустым, переадресованные копии отправленного сообщения будут иметь кнопку «Оплатить», позволяющую нескольким пользователям производить оплату непосредственно из пересылаемого сообщения, используя один и тот же счет. Если не пусто, перенаправленные копии отправленного сообщения будут иметь кнопку URL с глубокой ссылкой на бота (вместо кнопки оплаты) со значением, используемым в качестве начального параметра.
		title: 'BotMeetUp', // Название продукта, 1-32 символа
		description: `Оплата тикета за ${price[period].name} для бота BotMeetUp`,
		currency: 'RUB',
		prices: [{ label: 'Invoice Title', amount: 100 * price[period].rub }],
		photo_url:
			'https://downloader.disk.yandex.ru/preview/ee94c3d074f7c559be94010bfc3df4ca4d10d401a30c5c9ba8bcbc9338fb62f4/6345e01c/fcUv_AZSRL9lNdvUFwbobnc0lGSu2nVf2Tii6w6BLUMk-wV-cBux0-7XsDejV-v6kX-adlQ3VQNGreC0Q7c-WA%3D%3D?uid=0&filename=johannisbeere-rot.jpg&disposition=inline&hash=&limit=0&content_type=image%2Fjpeg&owner_uid=0&tknv=v2&size=2048x2048',
		need_phone_number: false,
		need_email: true,
		send_phone_number_to_provider: false,
		send_email_to_provider: false,
		photo_width: 640,
		photo_height: 480,
		payload: {
			unique_id: `${userId}`,
			period: period,
			provider_token: process.env.PROVIDER_TOKEN,
		},
	};
	return invoice;
}
