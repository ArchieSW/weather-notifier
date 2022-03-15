import axios from 'axios';

const OPEN_WEATHER_API = 'https://api.openweathermap.org/data/2.5/weather';

export class WeatherDataProvider {
  constructor() {
    this.OW_TOKEN = null;
  }

  Init(OW_TOKEN) {
    this.OW_TOKEN = OW_TOKEN;
  }

  async GetWeatherData(city) {
    const res = await axios.get(OPEN_WEATHER_API, {
      params: {
        q: city,
        appid: this.OW_TOKEN,
        units: 'metric',
      },
    }).catch((err) => {
      console.error(err);
    });

    return res.data.main;
  }
}