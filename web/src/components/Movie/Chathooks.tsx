import * as React from 'react';
import {useEffect, useState} from 'react'
import * as io from 'socket.io-client'


const Chathooks = (props) => {

  const [username, setUsername] = useState("")
  const [message, setMessage] = useState("")
  const [messages, setMessages] = useState([])

  const addMessage = data => {
    setMessages([...messages, data])
  };
  
  useEffect(() => {
    props.socket.on("message_receive", function(data) {
      addMessage(data);
    });
  }, [messages]);
 
    
  const keyPressEnter = event => {
    if (event.key === "Enter") {
      event.preventDefault();
      props.socket.emit("message_sent", {
        user: username,
        message: message,
        room: props.roomId
      });
      setMessage("");
    }
  };
    
  return (
    <>
    <div className="container">
      <div className="columns">
        <div className="column">
          <div className="column">
            <div className="section">
              <div className="message-header">chat message go below</div>
              <hr />
              <div className="message ">
                {messages.map(message => {
                  return (
                    <div>
                      {message.user}: {message.message}
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="column message-is-primary">
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={event => setUsername(event.target.value)}
                className="form-control"
              />
              <br />
              <input
                type="text"
                placeholder="type here to chat"
                className="column is-half"
                value={message}
                onKeyPress={keyPressEnter}
                onChange={event => setMessage(event.target.value)}
              />
              <br />
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}
      
       
            
     


export default Chathooks;
