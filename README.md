С помощью Бота можно самостоятельно создать объявление о планируемом заезде, просто написав ему в личку! ☝️
Кто планирует велотренировку и не против компании, то с помощью бота можно создать заезды, которые будут размещаться на канале и не затеряются в потоке сообщений в обычных группах. К каждому объявлению создается чат, где можно обсудить и уточнить детали заезда, голосование о том кто присоединяется к заезду, прогноз погоды на дату и место заезда.

**_Первоначальная настройка бота, канала, группы._**

В главный каталог добавить файл .env со следующими настройками:  
BOT_TOKEN="" - токен бота  
MONGODB=" - подключение к MONGODB  
MY_TELEGRAM_ID="" user_id в телеграм, что бы приходили оповещения при перезапуске бота

Настройки в телеграм:

1. Создать канал.
2. Создать группу и привязать к каналу.
3. Добавить Бота в канал и группу.
4. Боту назначить админ-права.
5. Владелец бота, канала, группы из группы отправляет команду /setup (права админа не должны быть анонимными). Происходит сохранение id владельца канала, группы в базе данных.
6. Добавить API-key для мониторинга с сайта https://openweathermap.org/api (необходимо зарегистрироваться и получить API-key).
7. Выйти из "setup" командой /quit.
8. В группе запустить команду /updateDataGroup
9. В канале запустить команду /updateDataChannel
10. Добавить "места старта" в настройки бота /location
11. Добавить к "местам старта" соответствующие места мониторинга погоды /weather.

Команды бота:  
**_/start_** стартовое приветствие, краткая информация о боте;  
**_/help_** список доступных команд для пользователей;  
**_/rideon_** создание объявления о заезде;

**_/setup_** список команд настройки бота под конкретный канал (текущий), _доступна только админам_;
**_/location_** добавление/удаление мест из которых стартует заезд, _доступна только админам_;  
**_/weather_** добавление/удаление мест мониторинга погоды, _доступна только админам_;  
**_/updateDataGroup_** добавление в БД данных привязанной (дискуссионной) группы (id, title ), _доступна только админам_;  
**_/updateDataChannel_** добавление в БД данных канала (id, name,title ), _доступна только админам_;  
**_/configuration_** просмотр всех настроек бота, сохраненных в БД, _доступна доступна из сцены "setup"_;
