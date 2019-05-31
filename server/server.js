require('dotenv').config();
var cors = require('cors');
var express = require('express');
var app = express();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
var axios = require('axios');
var bodyParser = require('body-parser');
// Set the port to 3001
var PORT = 3001;
var adminSocketList = [];
var roomList = [];
app.set("port", process.env.PORT || 3001);
// support parsing of application/json type post data
app.use(bodyParser.json());
//support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.get('/api/showRoom', function (req, res) {
    var filteredPublic = roomList.filter(function (room) { return room.type === "public"; });
    res.json({
        list: filteredPublic
    });
});
app.post('/api/getRoom', function (req, res) {
    var params = req.body.params;
    var filteredRoom = roomList.filter(function (room) { return room.roomId === params; });
    var haveRoom = filteredRoom.length > 0;
    console.log("filteredROOM", filteredRoom);
    var promise1 = axios.get('https://api.datamuse.com/words?ml=fast');
    var promise2 = axios.get('https://api.datamuse.com/words?ml=cheetah');
    Promise.all([promise1, promise2]).then(function (response) {
        var randomNum = Math.floor(Math.random() * 100);
        var data1 = response[0].data[randomNum].word.replace(/ /g, '');
        var data2 = response[1].data[randomNum].word.replace(/ /g, '');
        if (!haveRoom) {
            res.json({ response: false });
            return;
        }
        res.json({
            response: true,
            type: filteredRoom[0].type,
            username: "" + data1 + data2
        });
    });
});
app.post('/api/createRoom', function (req, res) {
    var promise1 = axios.get('https://api.datamuse.com/words?ml=fast');
    var promise2 = axios.get('https://api.datamuse.com/words?ml=cheetah');
    var socket = JSON.parse(req.body.socket);
    var type = req.body.type;
    console.log(socket.id);
    Promise.all([promise1, promise2]).then(function (response) {
        var randomNum = Math.floor(Math.random() * 100);
        var data1 = response[0].data[randomNum].word.replace(/ /g, '');
        var data2 = response[1].data[randomNum].word.replace(/ /g, '');
        var roomId = data1 + "-" + data2;
        roomList.push({
            roomId: roomId,
            type: type
        });
        adminSocketList.push({
            roomId: roomId,
            id: socket.id
        });
        res.json({ url: data1 + "-" + data2 });
    });
});
app.get('/api/youtube/:query', function (req, res) {
    var query = req.params.query;
    axios.get('https://www.googleapis.com/youtube/v3/search', {
        params: {
            key: process.env.YOUTUBE_API,
            part: 'snippet',
            order: 'viewCount',
            q: query,
            type: 'video',
            videoDefinition: 'high',
            maxResults: 5
        }
    }).then(function (result) {
        res.json(result.data.items);
    })["catch"](function (error) { return console.log(error); });
});
io.of('movie')
    .on('connection', function (socket) {
    console.log(socket.id + " connected to /movie");
    socket.on('message_sent', function (data) {
        io.of('movie').to(data.room).emit('message_receive', data);
    });
    socket.on('joinRoom', function (roomObject) {
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
        console.log(socket.id + 'joined ' + roomObject.roomId);
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
