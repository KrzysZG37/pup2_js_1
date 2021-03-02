const express = require('express'); 
const fs = require("fs-extra");
const app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true })); 

const user_db_path = "./users_db.json";

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
    constructor(login, password, cash, ifLogined) {
      this.login = login;
      this.password = password;
      this.cash = cash;
      this.ifLogined = false;
    }
  }
function read_db(path) {
    fs.ensureFileSync(path);
    let table = fs.readJsonSync(path, { throws: false });
    if (table === null) {
        return [];
    }
    return table;
}

function save_to_db(path, table) {
    fs.writeJsonSync(path, table);
}
function checkIfUserExists(login, password, cash, ifLogined) {
    let if_found_user
    for (let index = 0; index < user_table.length; index++) {
        const user = user_table[index];
        if (user.login === login && user.password === password) {
            if_found_user = index;
        }
    }
    return if_found_user;
}


app.get('/addUser/:login/:password/:cash/:ifLogined', function(request, response) {
    let user_table = read_db(user_db_path);
    let index_to_search = -1;
    for (let index = 0; index < user_table.length; index++) {
        const user = user_table[index];
        if (user.login === request.params.login && user.password === request.params.password) {
            index_to_search = index;
        }   
    }
    if (index_to_search === -1) {
      let login = request.params.login;
      let password = request.params.passsword;
      let cash = request.params.cash;
      let ifLogined = request.params.ifLogined;
      let user = new User(login,password,cash,ifLogined);
      user_table.push(user);
      fs.writeJsonSync(user_db_path, user_table);
      return response.send("User " + login + " added succesfully");
    } else {
      return response.send("User " + login + " already exists in db");
    }
});



app.listen(3000, function() { // odpalenie serwera i nasłuchiwanie na port 3000
    console.log('Server is listening on port 3000'); 
});