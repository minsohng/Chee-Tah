var express = require('express');
var app = express();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
// Set the port to 3001
var PORT = 3001;
io.on('connection', function (socket) {
    console.log('a user connected');
    socket.on('greet', function () {
        console.log("hi");
    });
});
http.listen(PORT, function () {
    console.log('listening on *:3001');
});
