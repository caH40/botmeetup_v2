export const commandsMessage = `
/help - помощь ❓
/start - старт 🤚
/rideon - формирование объявления о заезде ✔️
/rating - рейтинг велоорганизаторов 🚵
/delete - удаление объявления ❌
`;
export function startMessage(channel) {
	return `\nСоздаю объявления для информационного канала <a href = "https://t.me/${channelName}" >"Объявления о велозаездах"</a>.\nЗадам несколько вопросов о планируем Вами заезде и размещу объявление на канале, чтобы все желающие могли поучаствовать в Вашем заезде!\nНачнём ? /rideon`;
}

export const setupMessage = `-При первоначальном запуске /setup сохраняется id владельца группы/канала/бота в БД;\n-Для сохранение данных группы в БД - /updateDataGroup\n-В строке введите ключ в формате "API ваш_ключ";\n-Проверить сохраненные настройки /configuration\n-Для выхода введите /quit`;

export function posted(channelName) {
	return `Ваше объявление о заезде опубликовано на канале https://t.me/${channelName}`;
}
