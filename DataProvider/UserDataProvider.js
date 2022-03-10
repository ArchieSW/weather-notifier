import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  tg_id: { type: String, required: true },
  cities: [String],
});

export default class UserDataProvider {
  static _User = mongoose.model('User', UserSchema);

  static AddUser(tgId) {
    const newUser = new this._User({ tg_id: tgId, cities: [] });
    newUser.save();
  };

  static AddUserAndCity(tgId, city) {
    const newUser = new this._User({ tg_id: tgId, cities: [city] });
    newUser.save();
  };

  static async AddCityToUser(tgId, city) {
    const user = await this._User.findOne({ tg_id: tgId });
    if (user.cities.indexOf(city) === -1) {
      user.cities.push(city);
      user.save();
    }
  };

  static async DeleteUser (tgId) {
    await this._User.deleteOne({ tg_id: tgId });
  };

  static async Init (MDB_URL) {
    await mongoose.connect(MDB_URL, { useNewUrlParser: true }).catch((err) => console.error(err));
  };

  static async GetAllUsers () {
    return await this._User.find({});
  }

  static async GetUserById (tgId) {
    return await this._User.findOne({ tg_id: tgId });
  }
};