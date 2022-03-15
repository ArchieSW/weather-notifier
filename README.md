<h1 align="center"> Weather Notifier </h1>
<p align="center">
  <img width="400" height="400" src="https://user-images.githubusercontent.com/47922037/158451922-46877641-527b-4fed-83ea-6fb87dddf071.png">
</p>

## 📋 Description

This is my homework for backend meetup by lad.

## :muscle: Usage

Find bot in telegram: **@archie_weather_notifier_bot**

**User performance**
<p align="center">
  <img width="80%" src="https://user-images.githubusercontent.com/47922037/158455989-a82ac794-7e2f-48b5-b226-7e28a15cca79.gif">
</p>

## :point_right: Dependencies in project:
* [axios](https://github.com/axios/axios)
* [mongoose](https://github.com/Automattic/mongoose)
* [telegraf](https://github.com/telegraf/telegraf)

## :fire: Features:
* Support of all cities in the world even if it not exist
* Using mongodb to minimize RAM usage in VPS
* Clean architecture, using eslint to improve code quality
* Beauty readme file :)

## 🏗 Project setup
Before starting create `secret_keys.js` with api keys.

**`secret_keys.js` example:**
```js
const MONGO_HOSTNAME = 'localhost';
const MONGO_DB = 'NAME';
const MONGO_PORT = PORT;
export const MDB_URL = `mongodb://${MONGO_HOSTNAME}:${MONGO_PORT}/${MONGO_DB}`;
export const TG_TOKEN = '123123123123123'; // Telegram bot token
export const OW_TOKEN = '3123213123123'; // Open Weather api key
```

**Then run:**
```
npm install
npm start
```

## 👨‍🎓 What have I learned
* How to use mongodb
* What is the difference between relational databases and non-relational databases
* Web application architecture
* JavaScript modules, OOP, asynchronous programming, http requests and responses
* Navigate in the API of someone else's application
* How to configure package in npm, setting up dependencies
