# BootMeetUp

С помощью Бота можно самостоятельно создать объявление о планируемом заезде, просто написав ему в личку! ☝️
Кто планирует велотренировку и не против компании, то с помощью бота можно создать заезды, которые будут размещаться на канале и не затеряются в потоке сообщений в обычных группах. К каждому объявлению создается чат, где можно обсудить и уточнить детали заезда, голосование о том кто присоединяется к заезду, прогноз погоды на дату и место заезда.

# Первоначальная настройка бота, канала, группы.

В главный каталог добавить файл .env со следующими настройками:

```
BOT_TOKEN="" # токен бота
MONGODB="" # подключение к MONGODB
MY_TELEGRAM_ID="" # user_id в телеграм
```

## Настройки в телеграм:

1. Создать канал;
2. Создать группу и привязать к каналу;
3. Создать бота у @BotFather;
4. Добавить Бота в канал и группу;
5. Боту назначить админ-права. Запретить добавления бота в другие каналы у @BotFather;
6. В группе или в приватном сообщении боту запустить команду /myid, для получения вашего ID пользователя в телеграм. Сохранить его в файле .env;
7. В канале запустить команду /update для сохранения данных канала и группы в настройках бота. Важно! Команду /update может выполнить любой админ на канале, поэтому админом должен быть только владелец бота;
8. Командой /setup добавить API-key для мониторинга с сайта [openweathermap.org](https://openweathermap.org/api) (сначала необходимо зарегистрироваться и получить API-key);
9. В файл /weather/city-mylist.js добавить необходимые места старта (погоды). В файле /weather/citylistru.js содержатся все города на английском языке, при необходимости можно копировать от туда;
10. Добавить "места старта" в настройки бота /location;
11. Добавить к "местам старта" соответствующие места мониторинга погоды /weather.

# Команды бота:

**_/start_** стартовое приветствие, краткая информация о боте;  
**_/help_** список доступных команд для пользователей;  
**_/rideon_** создание объявления о заезде;
**_/edit_** редактирование/удаления объявления до старта заезда. Телеграм позволяет ботам удалять сообщения в течении 48 часов после их публикации;

**_/myid_** узнать свой ID пользователя телеграм;  
**_/setup_** добавление API ключа от сервера погоды, _доступна только админам_;  
**_/location_** добавление/удаление мест из которых стартует заезд, _доступна только админам_;  
**_/weather_** добавление/удаление мест мониторинга погоды, _доступна только админам_;  
**_/update_** добавление данных канала, группы (id, name, title ) в БД, _доступна только владельцу бота_;  
**_/config_** просмотр всех настроек бота, сохраненных в БД;
