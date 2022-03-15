import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  tg_id: { type: String, required: true },
  cities: [String],
});

export class UserDataProvider {
  constructor() {
    this._User = mongoose.model('User', UserSchema);
  }

  AddUser(tgId) {
    const newUser = new this._User({ tg_id: tgId, cities: [] });
    newUser.save();
  };

  AddUserAndCity(tgId, city) {
    const newUser = new this._User({ tg_id: tgId, cities: [city] });
    newUser.save();
  };

  async AddCityToUser(tgId, city) {
    const user = await this._User.findOne({ tg_id: tgId });
    if (user.cities.indexOf(city) === -1) {
      user.cities.push(city);
      user.save();
    }
  };

  async DeleteUser (tgId) {
    await this._User.deleteOne({ tg_id: tgId });
  };

  Init (MDB_URL) {
    mongoose.connect(MDB_URL, { useNewUrlParser: true }).catch((err) => console.error(err));
  };

  async GetAllUsers () {
    return await this._User.find({});
  }

  async GetUserById (tgId) {
    return await this._User.findOne({ tg_id: tgId });
  }

  async GetUsersByCity(city) {
    return await this._User.find({ cities: city });
  }

  async GetAllCities() {
    const users = await this.GetAllUsers();
    const cities = new Set();
    users.map((user) => {
      user.cities.map((city) => {
        cities.add(city);
      });
    });

    return Array.from(cities);
  }
};