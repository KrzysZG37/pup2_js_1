const mysql = require('mysql');
const express = require('express');
const { request } = require('node:http');
const { response } = require('express');


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





app.listen('3000', () => {
    console.log('Server started on port 3000')
})




main().catch(console.error);