Первоначальная настройка бота, канала, группы.
Создается канал.
Создается группа, которая привязывается к каналу.
Добавляется Бот в канал и группу.
Боту назначаются админ-права.
Владелец бота, канала, группы из группы команду /setup (права админа не должны быть анонимными).
Происходит сохранение id владельца канала, группы в базе данных.
Выйти из бота командой /quit
Сделать привязку группы к каналу.
В группе запустить команду /updateDataGroup
В канале запустить команду /updateDataChannel

Команды бота:  
**_/start_** стартовое приветствие, краткая информация о боте;  
**_/help_** список доступных команд для пользователей;  
**_/city_** добавление/удаление городов из которых стартует заезд, _доступна только админам_;  
**_/setup_** список команд настройки бота под конкретный канал (текущий), _доступна только админам_;
