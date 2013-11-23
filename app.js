var express = require('express'),
    app = express(),
    server = require('http').createServer(app),
    io = require('./sockets.js').listen(server),
    util = require('util');

var port = process.env.PORT || 8080;
server.listen(port, function (){
    util.log('Server started on port ' + port);
});

app.use(express.static(__dirname + '/static'));

