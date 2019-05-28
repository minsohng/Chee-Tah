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

app.get('/api/youtube/:query', (req, res) => {
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

let adminSocketList: Admin[] = [];
const roomList: string[] = [];

io.of('movie')
  .on('connection', (socket) => {


  console.log(socket.id + " connected to /movie");

 
  socket.on('message_sent', function(data){
    io.of('movie').to(data.room).emit('message_receive', data);
    console.log(data, 'let see if this works')
  })
  

  socket.on('joinRoom', (roomObject) => {
    if (!roomList.includes(roomObject.roomId)) {
      roomList.push(roomObject.roomId);

      adminSocketList.push({
        roomId: roomObject.roomId,
        id: socket.id
      })
      socket.emit('save admin cookie', {
        roomId: roomObject.roomId,
        id: socket.id 
      })
    }
    
    

    if (roomObject.roomIdCookie && roomObject.adminIdCookie) {
      const filteredAdmin = adminSocketList.filter(admin => admin.id === roomObject.adminIdCookie && admin.roomId === roomObject.roomId);
      const isAdmin = filteredAdmin.length > 0;
      if (isAdmin) {
        adminSocketList.push({
          roomId: roomObject.roomId,
          id: socket.id
        })
      }
    }
    
    console.log('ADMIN LIST:', adminSocketList)
    console.log('ROOM LIST:', roomList)

    console.log('joined ' + roomObject.roomId)

    socket.join(roomObject.roomId, () => {
      let rooms = Object.keys(socket.rooms);
      console.log(rooms);

     
      
     

      const filteredAdmin = adminSocketList.filter(admin => admin.id === socket.id)
      console.log("filtered", filteredAdmin)
      
      const isAdmin = filteredAdmin.length > 0;
 


      socket.on('share video timestamp', (timestamp: number) => {
        if (isAdmin) {
          socket.emit('is admin', filteredAdmin[0]);
        }
        if (isAdmin && timestamp) {
          console.log(timestamp)
          socket.to(roomObject.roomId).broadcast.emit('sync video timestamp', timestamp);
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




http.listen(PORT, '0.0.0.0',() => {
  console.log('listening on *:3001');
});


