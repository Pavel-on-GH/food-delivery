## FoodDelivery

### Описание

FoodDelivery - это веб-приложение для доставки еды.  
Пользовательская часть написана на React с применением Redux Toolkit в качестве стейт менеджера.  
Серверная логика реализована на Node.js, Express и MongoDB.

На данный момент реализованный функционал включает:

- Главную страницу, выводящую каталог товаров с бэкенда;
- Фильтрацию товаров по категориям;
- Страницу корзины товаров с возможностью редактирования (добавление / удаление товаров);
- Регистрацию и авторизацию пользователя.

### Стек (MERN)

- React;
- Redux Toolkit;
- TypeScript;
- CSS Modules;
- Node.js;
- Express;
- MongoDB.

### Деплой

Проект работает по адресу:

- Frontend: https://food-delivery-eta-eight.vercel.app/
- Backend: https://food-delivery-backend-r54n.onrender.com/

### Запуск

1. Клонируйте репозиторий и перейдите в папку проекта:

```bash
git clone https://github.com/Pavel-on-GH/food-delivery.git
cd food-delivery
```

2. Настройте переменные окружения:

В проекте используются два файла .env — для backend и frontend. Их нет в репозитории, вместо них представлены шаблоны .env.example.

Скопируйте шаблоны:

```bash
cp backend/.env.example backend/.env && cp frontend/.env.example frontend/.env
```

Отредактируйте backend/.env, указав свои значения:

```bash
MONGO_URI=<введите-свой-MONGO_URI>
JWT_SECRET=<введите-свой-JWT_SECRET>
```

3. Запустите backend

```bash
cd backend
npm install
npm run server
```

4. Запустите frontend

В новом терминале запустите frontend:

```bash
cd frontend
npm install
npm run dev
```

- Backend будет работать на http://localhost:4000
- Frontend будет работать на http://localhost:5173
