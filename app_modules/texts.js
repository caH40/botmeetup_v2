export const commandsMessage = `
/help - помощь ❓
/start - старт 🤚
/rideon - формирование объявления о заезде ✔️
/edit - редактирование/удаление объявлений ❌
/helpadmin - команды доступные админам ❓
`;
export const commandsMessageAdmin = `
/helpadmin - команды доступные админам ❓
/ticket - приобретение/продление тикета для использования бота 💰
/setup - добавление API ключа от сервера погоды ☀️
/location - добавление/удаление городов (дополнительная БД) 🏣
/config - просмотр всех настроек бота, сохраненных в БД ⚙️
/updategroup - добавление данных группы в БД' ❗
/updatechannel - добавление данных канала в БД' ❗
/myid - узнать свой ID пользователя телеграм ❓ 

`;
export function startMessage(channelName) {
	return `\nСоздаю объявления для информационного канала <a href = "https://t.me/${channelName}" >"Объявления о велозаездах"</a>.\nЗадам несколько вопросов о планируем Вами заезде и размещу объявление на канале, чтобы все желающие могли поучаствовать в Вашем заезде!\nНачнём ? /rideon`;
}

export const setupMessage = `В строке введите API ключ он должен состоять из 32х символов;\nДля выхода введите /quit`;

export function posted(channelName) {
	return `Ваше объявление о заезде опубликовано на канале https://t.me/${channelName}`;
}

export const editPostText =
	'Можно редактировать или удалять только те объявления о заездах которые еще не состоялись. Полностью удалить объявление можно в течении двух суток после его создания.';
