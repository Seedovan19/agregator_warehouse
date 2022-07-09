# Рекомендательный сервис по поиску складов для краткосрочного хранения (складов 3pl, ответственного хранения)

<описание проекта>

## Видео с презентацией работы сервиса (доступно по ссылке):
https://youtu.be/YsoO9CPFPfg

## Архитектура реализованного сервиса:
Клиент-серверная распределенная архитектура (RESTful). Обмен данными производится в формате JSON.
<img width="1132" alt="Снимок экрана 2022-07-09 в 03 55 39" src="https://user-images.githubusercontent.com/27068383/178085629-f17f1091-e61f-4b99-895a-e3e2ef9d33e9.png">


## Иерархия директорий с кратким описанием:

* agregator - Django-приложение, содержащее описание моделей базы данных (склада и всех таблиц имеющих транзитивную зависимость от сущности склада, запросов на поиск склада). Также данное приложение отвечает за получение данных обо всех складах, фильтрацию данных, получение данных о всех запроосах. В приложении реализован REST API для взаимодействия с компонентами фронтенда и рекомендательной системой
* agregator-back - директория проекта Django со всеми параметрами бэкенда
* analytics - Django-приложение, отвечающее за сохранение события о просмотре карточки склада пользователем. В базе данных также сохраняется IP-адрес пользователя, просмотревшего склад
* authentication - Django-приложение, в котором реализован функционал JWT-аутентификации, позволяет ограничить доступ к API, если у пользователя нет JWT-токена. Пока аутентификация существует только на уровне бэкенда
* agregator_front - React-приложение. Оно распологается на отдельном сервере, взаимодействует с Django при помощи отправки/получения данных в формате JSON. Реализованы компоненты пользовательских интерфейсов системы, роутинг. Готовые интерфейсы страниц сервиса можно увидеть на видео.
* helpers - Django-приложение с одной моделью TrackingModel, которая является вспомогательной. Она добавляется во все модели проекта, чтобы производилось автоматическое фиксирование времени, когда тот или иной объект БД был создан.
* media - все картинки объектов хранятся на сервере (не в базе данных)
* <ins>**recommender** - Рекомендательная система**</ins>. Здесь реализован пайплайн машинного обучения с получением данных из БД (при каждом новом запросе на поиск склада и при создании новых складов данных становится больше), автоматической подготовкой обучающей выборки, сохранения предварительной выборки в формате .csv, ручного анализа оценок релевантности запроса и тем складам, которые были выбраны как наиболее релевантные данному запросу, передачей выборки в модель, обучение модели машинного обучения, экспорта готовой модели и дальнейшее использование ее в работе (получения новых запросов на поиск склада и выдачи подходящих складов с оценкой, насколько данный склад релевантен запросу)
