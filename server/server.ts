require('dotenv').config()

const cors = require('cors');
const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const axios = require('axios');
const bodyParser = require('body-parser');


// Set the port to 3001
const PORT = 3001;

interface Admin {
  roomId: string
  id: string
}

const adminSocketList: Admin[] = [];
const roomList: string[] = [];

app.set("port", process.env.PORT || 3001);
// support parsing of application/json type post data
app.use(bodyParser.json());

//support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());

app.post('/api/getRoom', (req, res) => {
  const params = req.body.params;
  if (!roomList.includes(params)) {
    res.json({response: false});
    return;
  }
  res.json({response: true});
   
});

app.post('/api/createRoom', (req, res) => {
  const promise1 = axios.get('https://api.datamuse.com/words?ml=fast');
  const promise2 = axios.get('https://api.datamuse.com/words?ml=cheetah');
  const socket = JSON.parse(req.body.socket);
  
  console.log(socket.id)
  

  Promise.all([promise1, promise2]).then(function(response) {
    const randomNum = Math.floor(Math.random() * 100)
    const data1 = response[0].data[randomNum].word.replace(/ /g, '');
    const data2 = response[1].data[randomNum].word.replace(/ /g, '');
    const roomId = `${data1}-${data2}`
    roomList.push(roomId);
    adminSocketList.push({
      roomId: roomId,
      id: socket.id
    })

    
    
 
    res.json({url: `${data1}-${data2}`});
  });
});

app.get('/youtube/:query', (req, res) => {
  const {query} = req.params;
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
    res.json(result.data.items);
  }).catch(error => console.log(error));
})



io.of('movie')
  .on('connection', (socket) => {

  console.log(socket.id + " connected to /movie");

  socket.on('message_sent', function(data){
    io.of('movie').to(data.room).emit('message_receive', data);
  })
  

  socket.on('joinRoom', (roomObject) => {
 
     
    

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

    console.log(socket.id + 'joined ' + roomObject.roomId)

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

