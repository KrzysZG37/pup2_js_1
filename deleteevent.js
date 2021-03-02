const express = require('express'); // server
const fs = require("fs-extra");
const app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

app.get("/deleteEvent/<id>", function(request, response) {
    let EventsTable = utils.readDb(Events);
    for (let index = 0; index < EventsTable.length; index++) {
        const element = EventsTable[index];
        if (element["id"] == request.params.id){
            EventsTable.remove(element)
            return response.send("event zostal usuniety")
        }
        
        
    }
    return response.send("no such id of event") 
})

app.listen(3000, function() { // odpalenie serwera i nasłuchiwanie na port 3000
    console.log('Server is listening on port 3000'); 
});