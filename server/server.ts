const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
// Set the port to 3001
const PORT = 3001;

app.set("port", process.env.PORT || 3001);


io.on('connection', function(socket){
  console.log('a user connected');


  socket.on('greet', () => {
    console.log("hi")
  })
});


http.listen(PORT, () => {
  console.log('listening on *:3001');
});
