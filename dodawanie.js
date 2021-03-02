app.get('/addUser/:login/:password/:cash', function(request, response) {
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
      let user = new User(login,password,cash);
      user_table.push(user);
      fs.writeJsonSync(user_db_path, user_table);
      return response.send("User " + login + " added succesfully");
    } else {
      return response.send("User " + login + " already exists in db");
    }
});

