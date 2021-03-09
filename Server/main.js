// STWORZENIE SERWERA RESTOWEGO W EXPRESS.JS
const mysql = require('mysql');
let express = require("express");
const fs = require("fs-extra");
let bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json()); // wsparcie przesyłania plików json
app.use(bodyParser.urlencoded({ extended: true }));
// DEKLARACJA BIBLIOTEKI ODPOWIEDZIALNEJ ZA ODCZYT / ZAPIS DANYCH DO PLIKU

// DEKLARACJA ZMIENNEJ ODPOWIEDZIALNEJ ZA RÓZNE FUNKCJE POMOCNICZE
let lodash = require("lodash");
var easyinvoice = require('easyinvoice');
const FileSaver = require('file-saver');

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

app.get('/addEvent/:id/:date/:cost/:type/:name', function(request, response) {
    let event_table = read_db(user_db_path);
    let index_to_search = -1;
    for (let index = 0; index < event_table.length; index++) {
        const user = event_table[index];
        if (user.id === request.params.id) {
            index_to_search = index;
        }   
    }
    if (index_to_search === -1) {
      let id = request.params.id;
      let date = request.params.date;
      let cost = request.params.cost;
      let type = request.params.type;
      let name = request.params.name
      let event = new Event(id, date, cost, type, name);
      event_table.push(event);
      fsExtra.writeJsonSync(event_db_path, event_table);
      return response.send("Event " + id + " added succesfully");
    } else {
      return response.send("Event " + id + " already exists in db");
    }
});



const DATABASE_HOST='localhost';
const DATABASE_USER='admin';
const DATABASE_PASSWORD='admin';
const DATABASE_NAME='baza';

const db = mysql.createConnection({
    host: DATABASE_HOST,
    user: DATABASE_USER,
    password: DATABASE_PASSWORD,
    database: DATABASE_NAME
})


db.connect((err) => {
    if(err){
        throw err
    }
    console.log('MySql connected')
})


app.get('/showEventById/:id', (request, response) => {
    let id = request.params.id
    let sql = 'Select * from event where idEvent = ' +  mysql.escape(id)
    db.query(sql, (err, result) => {
        if (err) throw err
        response.send(response)
    }) 
})

main().catch(console.error);

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


company = process.argv[2]
address = process.argv[3]
zip = process.argv[4]
city = process.argv[5]
country = process.argv[6]
quantity = process.argv[7]
description = process.argv[8]
price = process.argv[9]
invoiceNumber = process.argv[10]


function generateInvoice(company,address,zip,city,country,quantity,description,price,invoiceNumber){
    var data = {
        "documentTitle": "FAKTURA",
        "currency": "PLN",
        "taxNotation": "vat",
        "marginTop": 25,
        "marginRight": 25,
        "marginLeft": 25,
        "marginBottom": 25,
        "logo": "https://www.easyinvoice.cloud/img/logo.png",
        "sender": {
            "company": "ZZSP EVENTY",
            "address": "plac Kilińskiego 8",
            "zip": "95-100",
            "city": "Zgierz",
            "country": "Polska"
        },
        "client": {
            "company": company,
            "address": address,
            "zip": zip,
            "city": city,
            "country": country
        },
        "invoiceNumber": invoiceNumber,
        "invoiceDate": "02-03-2021",
        "products": [
            {
                "quantity": quantity,
                "description": description,
                "tax": 6,
                "price": price
            },
        ],
        "bottomNotice": "Kindly pay your invoice within 14 days."
};
    easyinvoice.createInvoice(data, async function (result) {
        //The response will contain a base64 encoded PDF file
        console.log(result.pdf);

        await fs.writeFileSync("invoice.pdf",result.pdf,'base64');

    });}
generateInvoice(company,address,zip,city,country,quantity,description,price,invoiceNumber)

app.listen(3000, function() { // odpalenie serwera i nasłuchiwanie na port 3000
    console.log('Server is listening on port 3000'); 
});

