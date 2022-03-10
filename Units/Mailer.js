export default class Mailer {
  constructor() {
    this.CityList = [];
  }

  launch() {
    const mailingDate = new Date();
    mailingDate.setDate(new Date().getDate() + 1);
    mailingDate.setHours(7);
    setTimeout(mailingDate.now() - new Date().now());
    setInterval(() => {
      this.UpdateList();
      this.SendDistribution();
    }, 24 * 3600 * 1000);
  }

  UpdateList() { }

  SendDistribution() { }
}