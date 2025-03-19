# CryptoPortfolio

Приложение для управления портфелем активов криптовалюи с обновлением  в реальном времени курса и его изменения за последние 24 часа. Основные инструменты, использованные для реализации проекта: React, TypeScript, Redux и SCSS. Интегрирован WebSocket для получения актуальных цен активов.  

Приложение развернуто через Create React App.

## Установка и запуск  

#### Установите зависимости

```bash
$ npm install
```

#### Запуск проекта в режиме разработки
```bash
$ npm start
```

#### Сборка проекта
```bash
$ npm build
```

Проект будет доступен по адресу: http://localhost:3000.
<br /><br />

## Структура проекта

#### Структура проекта

    
    ├── public                          # Статические файлы, шаблон index.html
    ├── src                             # Файлы проекта
        ├── components                  # Компоненты приложения
            ├── addAssetForm            # Форма добавления валюты в портфолио
            ├── app                     # Корневой компонент
            ├── app-header              # Компонент шапки сайта
            ├── crypto-portfolio-card   # Компонент карточки криптовалюты
            ├── crypto-portfolio-list   # Компонент списка криптовалют
            ├── ...
            ├── ...
            └── modal                   # Компонент модального окна
        ├── images                      # Изображения
        ├── service                     # Управление состоянием приложения
            ├── hooks                   # Кастомные хуки
                └── useBinance          # Хук для получения данных по WebSocket
            ├── slices                  # Слайсы
                └── cryptoSlice.ts      # Слайс Криптовалюты
            ├── thunk                   # Thunks
                └── cryptoThunk.ts      # Thunk для слайса Криптовалюты
            └── store.ts                # Стор приложения
        ├── styles
            └── variables.scss          # Переменные SCSS
        ├── index.scss
        ├── index.ts
        └── src/react-app-env.d.ts
    ├── package.json                    # Конфигруационный файл
    ├── tsconfig.json                   # Конфигруационный файл
    ...
    └── README.md                       


#### Основные технологии

* React: Библиотека для построения пользовательского интерфейса
* TypeScript: Добавляет статическую типизацию для повышения надежности кода
* Redux Toolkit: Управление состоянием приложения
* SCSS: Препроцессор CSS для удобной работы со стилями
* WebSocket: Реализация real-time обновления цен активов
* React Transition Group: Анимации для плавного взаимодействия с интерфейсом

#### Все использованные библиотеки
* @reduxjs/toolkit@2.6.1  
* @testing-library/dom@10.4.0  
* @testing-library/jest-dom@6.6.3  
* @testing-library/react@16.2.0  
* @testing-library/user-event@13.5.0  
* @types/jest@27.5.2  
* @types/node@16.18.126  
* @types/react-dom@19.0.4  
* @types/react-transition-group@4.4.12  
* @types/react@19.0.10  
* classnames@2.5.1  
* nanoid@5.1.4  
* react-dom@19.0.0  
* react-redux@9.2.0  
* react-scripts@5.0.1  
* react-transition-group@4.4.5  
* react@19.0.0  
* sass@1.85.1  
* typescript@4.9.5  
* web-vitals@2.1.4  