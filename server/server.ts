import { Socket } from "dgram";

const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
// Set the port to 3001
const PORT = 3001;

app.set("port", process.env.PORT || 3001);


interface Admin {
  roomId: string
  id: string
}

const adminSocketList: Admin[] = [];
const roomList: string[] = [];

io.of('movie')
  .on('connection', (socket) => {


  console.log(socket.id + " connected to /movie");
  socket.on('joinRoom', (roomId) => {
    if (!roomList.includes(roomId)) {
      roomList.push(roomId);
      adminSocketList.push({
        roomId: roomId,
        id: socket.id
      })
    }

    console.log('ADMIN LIST:', adminSocketList)
    console.log('ROOM LIST:', roomList)

    console.log('joined ' + roomId)
    socket.join(roomId, () => {
      let rooms = Object.keys(socket.rooms);
      console.log(rooms);


      socket.on('share video timestamp', (timestamp: number) => {
        console.log(timestamp)
        
        const newArr = adminSocketList.filter(admin => admin.id === socket.id)
        console.log('newArr', newArr)
  
        if (newArr.length > 0) {
          socket.to(roomId).broadcast.emit('sync video timestamp', timestamp);
        }
        
      })
    });
  })

  socket.on('get number of clients', (roomId) => {
    io.of('/movie').in(roomId).clients((error, clients) => {
      if (error) throw error;
      console.log(`number of clients ${clients.length} ${clients}`)
    });
  })

  socket.on('disconnect', () => {

  })


})




http.listen(PORT, () => {
  console.log('listening on *:3001');
});
