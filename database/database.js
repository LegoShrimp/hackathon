/************** MODELS ***************
GSD_User:
    - firstname
    - lastname
    - username
    - password
GSD_Room:
    - id
    - name
GSD_Group:
    - username Ref GSD_User
    - id Ref GSD_Room
*************************************/

/************** POSTGRES DATABASE STUFF **************/

// Require posgres
var pg = require('pg').native; 
// Require the credentials for connetcting to postgres
var credentials = require('./credentials.js').data;

// Client
var client = new pg.Client(credentials);

// Connect to the server and report any error
client.connect(function(err) {
  if(err) {
    return console.error('could not connect to postgres', err);
  }
  // Query time of connect
  client.query('SELECT NOW() AS "theTime"', function(err, result) {
    if(err) {
      return console.error('error running query', err);
    }
    console.log(result.rows[0].theTime);
  });
})

module.exports.client = client;

/*
// Create a new user
client.query("INSERT INTO GSD_User(firstname, lastname, username, password) VALUES($1, $2, $3, $4);", ["Ben", "K", "bkell001", "1234"], function(err, result) {
    if(err) {
        return console.error('error running query', err);
    }
});

// Show all users in DB
sel_user_query = client.query("SELECT * FROM GSD_User", function(err, result) {
    if(err) {
        return console.error('error running query', err);
    }
    
    console.log(result);
});;

});
*/

/*
user_query.on("row", function (row, result) {
    result.addRow(row);
});
*/

/*
user_query.on("end", function(result) {
    console.log(JSON.stringify(result.rows, null, "   "));
    client.end();
});
*/

/*****************************************************/

/*
// Drop tables that exist
client.query("DROP TABLE IF EXISTS GSD_User CASCADE", function(err, result) {
    if(err) {
        return console.error('error running query', err);
    }
});

client.query("DROP TABLE IF EXISTS GSD_Room CASCADE;", function(err, result) {
    if(err) {
        return console.error('error running query', err);
    }
});


// Create the tables
user_query = client.query("CREATE TABLE GSD_User(firstname varchar(50) NOT NULL, lastname varchar(50) NOT NULL, username varchar(50) PRIMARY KEY, password varchar(50) NOT NULL", function(err, result) {
    if(err) {
      return console.error('error running query', err);
    }
  });

room_query = client.query("CREATE TABLE GSD_Room(room_id bigserial PRIMARY KEY)", function(err, result) {
    if(err) {
      return console.error('error running query', err);
    }
  });

group_query = client.query("CREATE TABLE GSD_Group(room_id bigserial FOREIGN KEY REFERENCES Room(room_id) NOT NULL, username varchar(50) FOREIGN KEY REFERENCES User(username) NOT NULL)", function(err, result) {
    if(err) {
      return console.error('error running query', err);
    }
  });
*/
