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

Events = "./events_db.json"

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

app.get('/addEvent/:id/:date/:cost/:type/:name', (request, response) => {
    let id = request.params.id
    let date = request.params.date
    let cost = request.params.cost
    let type = request.params.type
    let name = request.params.name
    var sql = "INSERT INTO event (id,date,cost,type,name)(id =?,name =?, cost=?, type=?, date=?)";
    db.query(sql,[mysql.escape(id),mysql.escape(name),mysql.escape(cost),mysql.escape(type),mysql.escape(date)], function (err, result) {
      if (err) throw err;
      console.log(result.affectedRows + " record(s) added successfully");
    });
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

app.get('/deleteEvent/:id', (request, response) => {
    let id = request.params.id
    let sql = 'DELETE FROM event WHERE idEvent = ' + mysql.escape(id);
    db.query(sql, function (err, result) {
      if (err) throw err;
      console.log("Number of records deleted: " + result.affectedRows);
    });
});

 app.get('/editEvent/:id/:name/:cost/:type/:date', (request, response) => {
    let id = request.params.id
    let name = request.params.name
    let cost = request.params.cost
    let type = request.params.type
    let date = request.params.date
    var sql = "UPDATE event SET name =?, cost=?, type=?, date=? WHERE idEvent =" + mysql.escape(id);
    db.query(sql,[mysql.escape(name),mysql.escape(cost),mysql.escape(type),mysql.escape(date)], function (err, result) {
      if (err) throw err;
      console.log(result.affectedRows + " record(s) updated");
    });
});

main().catch(console.error);


app.get('/addInvoice/:company/:address/:zip/:city/:country/:quantity/:description/:price/:invoiceNumber', function(request, response) {
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
            "company": request.params.company,
            "address": request.params.address,
            "zip": request.params.zip,
            "city": request.params.city,
            "country": request.params.country
        },
        "invoiceNumber": request.params.invoiceNumber,
        "invoiceDate": "02-03-2021",
        "products": [
            {
                "quantity": request.params.quantity,
                "description": request.params.description,
                "tax": 6,
                "price": request.params.price
            },
        ],
        "bottomNotice": "Kindly pay your invoice within 14 days."
};
    easyinvoice.createInvoice(data, async function (result) {
        //The response will contain a base64 encoded PDF file
        console.log(result.pdf);

        await fs.writeFileSync("invoice.pdf",result.pdf,'base64');

    return response.send("ivoice created");
    })
});
;


app.listen(3000, function() { // odpalenie serwera i nasłuchiwanie na port 3000
    console.log('Server is listening on port 3000'); 
});

