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
var curVideoObj = {};
var playlistObj = {};
var statusObj = {};
app.set("port", process.env.PORT || 3001);
// support parsing of application/json type post data
app.use(bodyParser.json());
//support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.post('/api/fetchState', function (req, res) {
    var roomId = req.body.roomId;
    console.log("fetchState-room", roomId);
    console.log("fetchState-obj", curVideoObj);
    console.log("fetchState-objroom", curVideoObj[roomId]);
    res.json(curVideoObj[roomId] && curVideoObj[roomId]);
});
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
    var promise1 = axios.get('https://api.datamuse.com/words?ml=ocean');
    var promise2 = axios.get('https://api.datamuse.com/words?ml=animal');
    var currentVideo = curVideoObj[params] ? curVideoObj[params].videoId : '';
    Promise.all([promise1, promise2]).then(function (response) {
        var randomNum = Math.floor(Math.random() * 100);
        var data1 = response[0].data[randomNum].word.replace(/ /g, '');
        var data2 = response[1].data[randomNum].word.replace(/ /g, '');
        if (!haveRoom) {
            res.json({ response: false });
            return;
        }
        io.of('movie').emit('update create room state');
        res.json({
            response: true,
            type: filteredRoom[0].type,
            username: data1 + " " + data2,
            playlist: playlistObj[params],
            currentVideo: currentVideo
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
        var isNotAvailable;
        var roomId;
        var data1, data2;
        do {
            var randomNum = Math.floor(Math.random() * 100);
            data1 = response[0].data[randomNum].word.replace(/ /g, '');
            data2 = response[1].data[randomNum].word.replace(/ /g, '');
            roomId = data1 + "-" + data2;
            var filteredRoom = roomList.filter(function (room) { return room.roomId === roomId; });
            isNotAvailable = filteredRoom.length > 0;
        } while (isNotAvailable);
        roomList.push({
            roomId: roomId,
            type: type
        });
        adminSocketList.push({
            roomId: roomId,
            id: socket.id
        });
        playlistObj[roomId] = [];
        statusObj[roomId] = {};
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
    var roomId;
    console.log(socket.id + " connected to /movie");
    socket.on('message_sent', function (data) {
        io.of('movie').to(data.room).emit('message_receive', data);
    });
    socket.on('add to playlist', function (data) {
        playlistObj[data.roomId].push(data);
        socket.to(data.roomId).broadcast.emit('sync playlist', playlistObj[data.roomId]);
    });
    socket.on('done playing', function (data) {
        console.log("PLAYLIST", playlistObj[roomId]);
        statusObj[data][socket.id] = false;
        console.log(statusObj);
        var statusArr = Object.values(statusObj[data]);
        if (!statusArr.includes(true) && playlistObj[data].length > 0) {
            var nextVideo = playlistObj[data].shift();
            if (curVideoObj[roomId].videoId === nextVideo.id) {
                io.of('movie').to(data).emit('sync video timestamp', 0);
            }
            else {
                io.of('movie').to(data).emit('play next video', nextVideo.id);
            }
            io.of('movie').to(data).emit('sync playlist', playlistObj[data]);
            for (var key in statusObj[data]) {
                statusObj[data][key] = true;
            }
            curVideoObj[roomId] = {
                videoData: nextVideo,
                videoId: nextVideo.id,
                roomId: roomId
            };
            // socketId: '/movie#-5V8j5wI85yVikOmAAAE',
            // roomId: 'rapid-chetah',
            // publishedAt: '2017-04-21T09:00:05.000Z',
            // channelId: 'UCweOkPb1wVVH0Q0Tlj4a5Pw',
            // title: '[MV] IU(아이유) _ Palette(팔레트) (Feat. G-DRAGON)',
            // description: '[MV] IU(아이유) _ Palette(팔레트) (Feat. G-DRAGON) *English subtitles are now available. :D (Please click on \'CC\' button or activate \'Interactive Transcript\' ...',
            // thumbnails: { default: [Object], medium: [Object], high: [Object] },
            // channelTitle: '1theK (원더케이)',
            // liveBroadcastContent: 'none',
            // id: 'd9IxdwEFk1c' }
            io.of('movie').emit('update room state');
            console.log(statusObj);
        }
    });
    socket.on('joinRoom', function (roomObject) {
        roomId = roomObject.roomId;
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
            if (statusObj[roomObject.roomId]) {
                statusObj[roomObject.roomId][socket.id] = true;
            }
            console.log(statusObj);
            var rooms = Object.keys(socket.rooms);
            console.log(rooms);
            var filteredAdmin = adminSocketList.filter(function (admin) { return admin.id === socket.id; });
            console.log("filtered", filteredAdmin);
            var isAdmin = filteredAdmin.length > 0;
            if (isAdmin) {
                socket.emit('is admin', filteredAdmin[0]);
            }
            socket.on('play video', function (data) {
                if (isAdmin) {
                    curVideoObj[roomId] = data;
                    console.log("current video:  " + curVideoObj[roomId].videoId);
                    socket.to(data.roomId).broadcast.emit('play video', data.videoId);
                    io.of('movie').emit('update room state');
                }
            });
            socket.on('share video timestamp', function (timestamp) {
                if (isAdmin && timestamp) {
                    console.log(timestamp);
                    socket.to(roomObject.roomId).broadcast.emit('sync video timestamp', timestamp);
                }
            });
            socket.on('disconnect', function () {
                console.log('socket disconnected');
                if (roomId && socket && statusObj[roomId] && statusObj[roomId][socket.id]) {
                    delete statusObj[roomId][socket.id];
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
});
http.listen(PORT, '0.0.0.0', function () {
    console.log('listening on *:3001');
});
