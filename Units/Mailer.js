import { WeatherDataProvider } from "../DataProvider/WeatherDataProvider.js";
import { UserDataProvider } from "../DataProvider/UserDataProvider.js";
import { OW_TOKEN } from "../secret_keys.js";

const WeatherDP = new WeatherDataProvider();
WeatherDP.Init(OW_TOKEN);
const UserDP = new UserDataProvider();

export default class Mailer {
  constructor(bot) {
    this.CityList = [];
    this.bot = bot;
  }

  launch() {
    const now = new Date();
    const mailingDate = new Date();
    mailingDate.setDate(now.getDate() + 1)
    mailingDate.setHours(6);
    mailingDate.setMinutes(0);
    const timeoutTime = mailingDate.getTime() - now.getTime();

    setTimeout(() => {
      this.UpdateList().then(() => this.SendDistribution());
      setInterval(() => {
        this.UpdateList().then(() => this.SendDistribution());
      }, 24 * 3600 * 1000 );
    }, timeoutTime);
  }

  async UpdateList() {
    this.CityList = await UserDP.GetAllCities();
  }

  SendDistribution() {
    this.CityList.map(async (city) => {
      const weatherData = await WeatherDP.GetWeatherData(city);
      const users = await UserDP.GetUsersByCity(city);
      users.map((user) => this.bot.telegram.sendMessage(user.tg_id, `Temperature in ${city}: ${weatherData.temp}℃\nFeels like: ${weatherData.feels_like}℃`));
    });
  }
}