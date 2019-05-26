"use strict";
exports.__esModule = true;
var express = require('express');
var app = express();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
// Set the port to 3001
var PORT = 3001;
app.set("port", process.env.PORT || 3001);
var adminSocketList = [];
var roomList = [];
io.of('movie')
    .on('connection', function (socket) {
    console.log(socket.id + " connected to /movie");
    socket.on('joinRoom', function (roomId) {
        if (!roomList.includes(roomId)) {
            roomList.push(roomId);
            adminSocketList.push({
                roomId: roomId,
                id: socket.id
            });
        }
        console.log('ADMIN LIST:', adminSocketList);
        console.log('ROOM LIST:', roomList);
        console.log('joined ' + roomId);
        socket.join(roomId, function () {
            var rooms = Object.keys(socket.rooms);
            console.log(rooms);
            socket.on('share video timestamp', function (timestamp) {
                console.log(timestamp);
                var newArr = adminSocketList.filter(function (admin) { return admin.id === socket.id; });
                console.log('newArr', newArr);
                if (newArr.length > 0) {
                    socket.to(roomId).broadcast.emit('sync video timestamp', timestamp);
                }
            });
        });
    });
    socket.on('get number of clients', function (roomId) {
        io.of('/movie')["in"](roomId).clients(function (error, clients) {
            if (error)
                throw error;
            console.log("number of clients " + clients.length + " " + clients);
        });
    });
    socket.on('disconnect', function () {
    });
});
http.listen(PORT, function () {
    console.log('listening on *:3001');
});
