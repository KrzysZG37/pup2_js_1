app.get("/showAllUpcomingEvents", function(request, response) {
    let EventsTable = utils.readDb(Events);
        return response.send(EventsTable);
        