const express = require('express'); // server
const fs = require("fs-extra");
const app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies



app.get('/filtrEventById/<id>', function(request, response) {
    let eventTable = utils.readDb(Events)
    for (let i = 0; i < eventTable.length; i++) {
        const element = eventTable[i];
        if (eventTable['id'] == request.params.id) {
            return response.send(element)
        }
    }
    return response.send('no such id')

})


app.listen(3000, function() { // odpalenie serwera i nasłuchiwanie na port 3000
    console.log('Server is listening on port 3000');
});