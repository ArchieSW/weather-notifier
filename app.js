import { Telegraf } from 'telegraf';
import { UserDataProvider } from './DataProvider/UserDataProvider.js';
import { WeatherDataProvider } from './DataProvider/WeatherDataProvider.js';
import { MDB_URL } from './secret_keys.js';
import { TG_TOKEN } from './secret_keys.js';
import { OW_TOKEN } from './secret_keys.js';
import Mailer from './Units/Mailer.js';

const UserDP = new UserDataProvider();
const WeatherDP = new WeatherDataProvider();

UserDP.Init(MDB_URL);
WeatherDP.Init(OW_TOKEN);

const bot = new Telegraf(TG_TOKEN);
const mailer = new Mailer(bot);

bot.start((ctx) => {
  const userId = ctx.message.chat.id;
  UserDP.AddUser(userId);
  ctx.telegram.sendMessage(ctx.message.chat.id, 'Hello, welcome to weather notifier bot.\nTo start getting weather notifications about cities, type:\n/add_city <Your city>\nTo stop getting notifications type:\n/stop\nTo get current information about weather type:\n/get_weather');
});

bot.command('add_city', (ctx) => {
  const city = ctx.message.text.slice('/add_city '.length);
  UserDP.AddCityToUser(ctx.message.from.id, city);
});

bot.command('stop', (ctx) => {
  UserDP.DeleteUser(ctx.message.from.id);
});

bot.command('get_weather', (ctx) => {
  UserDP.GetUserById(ctx.message.from.id).then((user) => {
    const {cities} = user;
    cities.map(async (city) => {
      const weatherData = await WeatherDP.GetWeatherData(city);
      const messageText = `Temperature in ${city}: ${weatherData.temp}\nFeels like: ${weatherData.feels_like}`;
      ctx.telegram.sendMessage(ctx.message.from.id, messageText);
    });
  });
});

bot.launch();
mailer.launch();