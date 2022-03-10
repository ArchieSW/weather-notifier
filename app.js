import axios from 'axios';
import { Telegraf } from 'telegraf';
import UserDataProvider from './DataProvider/UserDataProvider.js';
import { MDB_URL } from './secret_keys.js';
import { TG_TOKEN } from './secret_keys.js';
import { OW_TOKEN } from './secret_keys.js';

const OPEN_WEATHER_API = 'https://api.openweathermap.org/data/2.5/weather';

UserDataProvider.Init(MDB_URL);

const bot = new Telegraf(TG_TOKEN);

bot.start((ctx) => {
  const userId = ctx.message.chat.id;
  UserDataProvider.AddUser(userId);
  ctx.telegram.sendMessage(ctx.message.chat.id, 'Hello, welcome to weather notifier bot.\nTo start getting weather notifications about cities, type:\n/add_city <Your city>\nTo stop getting notifications type:\n/stop\nTo get current information about weather type:\n/get_weather');
});

bot.command('add_city', (ctx) => {
  const city = ctx.message.text.slice('/add_city '.length);
  UserDataProvider.AddCityToUser(ctx.message.from.id, city);
});

bot.command('stop', (ctx) => {
  UserDataProvider.DeleteUser(ctx.message.from.id);
});

bot.command('get_weather', (ctx) => {
  UserDataProvider.GetUserById(ctx.message.from.id).then((user) => {
    const {cities} = user;
    cities.map((city) => {
      axios.get(OPEN_WEATHER_API, {
        params: {
          q: city,
          appid: OW_TOKEN,
          units: 'metric',
        },
      }).then((res) => {
        console.log(res);
        ctx.telegram.sendMessage(ctx.message.from.id, `Temperature in ${city}: ${res.data.main.temp}\n Feels like: ${res.data.main.feels_like}`);
      }).catch((err) => {
        ctx.telegram.sendMessage(ctx.message.from.id, `Could not get information about: ${city}`);
        console.error(err);
      });
    });
  });
});

bot.launch();