const event_db_path = "./events_db.json";

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
      fs.writeJsonSync(event_db_path, event_table);
      return response.send("Event " + id + " added succesfully");
    } else {
      return response.send("Event " + id + " already exists in db");
    }
});