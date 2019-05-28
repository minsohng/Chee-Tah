require('dotenv').config()

const cors = require('cors');
const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const axios = require('axios')

// Set the port to 3001
const PORT = 3001;

app.set("port", process.env.PORT || 3001);
app.use(cors());

app.get('/youtube/:query', (req, res) => {
  const {query} = req.params;
  console.log(query);
  axios.get(
    'https://www.googleapis.com/youtube/v3/search', {
     params: {
       key: process.env.YOUTUBE_API,
       part: 'snippet',
       order: 'viewCount',
       q: query,
       type: 'video',
       videoDefinition: 'high',
       maxResults: 5
    }
  }).then(result => {
    console.log(result.data.items);
    res.json(result.data.items);
  }).catch(error => console.log(error));
})

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


      const filteredAdmin = adminSocketList.filter(admin => admin.id === socket.id)
      const isAdmin = filteredAdmin.length > 0;
 


      socket.on('share video timestamp', (timestamp: number) => {
        if (isAdmin) {
          socket.emit('is admin', filteredAdmin[0]);
        }
        if (isAdmin && timestamp) {
          console.log(timestamp)
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
    console.log('socket disconnected')
    
  })


})




http.listen(PORT, () => {
  console.log('listening on *:3001');
});
