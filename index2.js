
const express = require('express');
const { request } = require('node:http');
const { response } = require('express');

const mysql = require('mysql');
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


app.get('/showEventById/<id>', (request, response) => {
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

app.listen('3000', () => {
    console.log('Server started on port 3000')
})
