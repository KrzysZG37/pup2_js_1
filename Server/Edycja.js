// STWORZENIE SERWERA RESTOWEGO W EXPRESS.JS
let express = require("express");
const fs = require("fs-extra");
let bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json()); // wsparcie przesyłania plików json
app.use(bodyParser.urlencoded({ extended: true }));

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

//Można Edytować wszystko po za nazwą eventu bo nie ma id eventu a musi rozpoznawać event
app.get('/editEvent/:name/:cost/:type/:date', function(request, response) {
    let events_table = readDb(events_db_path)
    for (let index = 0; index < events_table.length; index++) {
        const event = events_table[index];
        if (event.name === request.params.name){
            event.cost = request.params.cost;
            event.type = request.params.type;
            event.date = request.params.date;
            saveToDb(events_db_path, events_table);
            return response.send("Event edited successfully");
        }
    }
    return response.send("No such event found");
});

app.listen(3000, function() { // odpalenie serwera i nasłuchiwanie na port 3000
    console.log('Server is listening on port 3000'); 
});
