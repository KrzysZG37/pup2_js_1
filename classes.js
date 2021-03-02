class Event {
    constructor(id, date, cost, type, name) {
      this.id = id;
      this.date = date;
      this.cost = cost;
      this.type = type;
      this.name = name;
    }
  }


  class User {
    constructor(login, password, cash, ifLogined, signedEvents) {
      this.login = login;
      this.password = password;
      this.cash = cash;
      this.ifLogined = false;
      this,signedEvents = []
    }
  }