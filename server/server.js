var express = require('express');
var app = express();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
// Set the port to 3001
var PORT = 3001;
app.set("port", process.env.PORT || 3001);
// io.of('movie')
//   .on('connection', () => {
//     console.log("connected to /movie");
//   })
// io.of('game')
//   .on('connection', () => {
//   console.log("connected to /movie");
// })
// io.on('connection', function(socket){
//   console.log('a user connected');
//   socket.on('disconnect', () => {
//     console.log("user disconnected")
//   })
// });
http.listen(PORT, function () {
    console.log('listening on *:3001');
});
