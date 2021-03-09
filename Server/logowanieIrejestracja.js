// STWORZENIE SERWERA RESTOWEGO W EXPRESS.JS
let express = require("express");
const fs = require("fs-extra");
let bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json()); // wsparcie przesyłania plików json
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(3000, function() { // odpalenie serwera i nasłuchiwanie na port 3000
    console.log('Server is now working on port 3000'); 
});

// DEKLARACJA BIBLIOTEKI ODPOWIEDZIALNEJ ZA ODCZYT / ZAPIS DANYCH DO PLIKU
let fsExtra = require("fs-extra");

// DEKLARACJA ZMIENNEJ ODPOWIEDZIALNEJ ZA RÓZNE FUNKCJE POMOCNICZE
let lodash = require("lodash");

var utils = require('./utils.js');

const users_db_path = "./users_db.json";
const events_db_path = "./events_db.json";

class Event {
    constructor(date, cost, type, name) {
      this.date = date;
      this.cost = cost;
      this.type = type;
      this.name = name;
    }
  }


  class User {
    constructor(login, password, cash, ifLogined) {
      this.login = login;
      this.password = password;
      this.cash = cash;
      this.ifLogined = false;
    }
  }

app.get("/registerUser/:login/:password/:cash/:ifLogined", function(request, response) {
    let usersTable = utils.readDb(users_db_path);
    for (let index = 0; index < usersTable.length; index++) {
        const person = usersTable[index];
        if (person.password === request.params.password && person.login === request.params.login) {
            return response.send("User with this login and password already exists");
        }
    }
    usersTable.push(new User(request.params.login, request.params.password, request.params.cash, request.params.ifLogined));
    utils.saveToDb(users_db_path, usersTable);
    return response.send("User " + request.params.login + " added succesfully to data base");
});


app.get("/logIn/:login/:password/:ifLogined", function(request, response) {
    let usersTable = utils.readDb(users_db_path);
    for (let index = 0; index < usersTable.length; index++) {
        const person = usersTable[index];
        if (person.password === request.params.password && person.login === request.params.login) {
            if (person.ifLogined == false){
                person.ifLogined = true;
                utils.saveToDb(users_db_path, usersTable);
                
            }
            return response.send("User logged in successfully");
        }else{
            return response.send("Error")
        }
    }
});
