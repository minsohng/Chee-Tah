import { Socket } from "dgram";

const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
// Set the port to 3001
const PORT = 3001;

app.set("port", process.env.PORT || 3001);


//  travis code

// io.of('movie')
//   .on('connection', () => {
//     console.log("connected to /movie");
//     var data = {};
//     .on("createRoom", (info)=>{ //roomnam = ajksldf code
//       data[info.roomName] = {link: info.link };
//       io.join(roomName);
//       let users = []
//     })
//     .on("joinRoom", (roomName)=>{ //roomnam = ajksldf code
//       io.join(roomName);
//       //send data[roomName]
//       let users = []
//     })
//   })

io.of('game')
  .on('connection', () => {
  console.log("connected to /movie");
})

// io.on('connection', function(socket){
//   console.log('a user connected');

//   socket.on('disconnect', () => {
//     console.log("user disconnected")
//   })
// });


http.listen(PORT, () => {
  console.log('listening on *:3001');
});
