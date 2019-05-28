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

    socket.on('message_sent', function (data) {
        io.of('movie').to(data.room).emit('message_receive', data);
        console.log(data, 'let see if this works');
    });
  
    socket.on('joinRoom', function (roomObject) {
        if (!roomList.includes(roomObject.roomId)) {
            roomList.push(roomObject.roomId);

            adminSocketList.push({
                roomId: roomObject.roomId,
                id: socket.id
            });
            socket.emit('save admin cookie', {
                roomId: roomObject.roomId,
                id: socket.id
            });
        }
        if (roomObject.roomIdCookie && roomObject.adminIdCookie) {
            var filteredAdmin = adminSocketList.filter(function (admin) { return admin.id === roomObject.adminIdCookie && admin.roomId === roomObject.roomId; });
            var isAdmin = filteredAdmin.length > 0;
            if (isAdmin) {
                adminSocketList.push({
                    roomId: roomObject.roomId,
                    id: socket.id
                });
            }
        }
        console.log('ADMIN LIST:', adminSocketList);
        console.log('ROOM LIST:', roomList);
        console.log('joined ' + roomObject.roomId);
        socket.join(roomObject.roomId, function () {
            var rooms = Object.keys(socket.rooms);
            console.log(rooms);
            var filteredAdmin = adminSocketList.filter(function (admin) { return admin.id === socket.id; });
            console.log("filtered", filteredAdmin);
            var isAdmin = filteredAdmin.length > 0;
            socket.on('share video timestamp', function (timestamp) {
                if (isAdmin) {
                    socket.emit('is admin', filteredAdmin[0]);
                }
                if (isAdmin && timestamp) {
                    console.log(timestamp);
                    socket.to(roomObject.roomId).broadcast.emit('sync video timestamp', timestamp);
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
        console.log('socket disconnected');
    });
});
http.listen(PORT, '0.0.0.0', function () {
    console.log('listening on *:3001');
});
