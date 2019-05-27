import React from "react";

import io from "socket.io-client";

class Chat extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      message: "",
      messages: []
    };

    this.socket = io("localhost:3001");

    this.socket.on("message_receive", function(data) {
      addMessage(data);
    });

    const addMessage = data => {
      console.log(data);
      this.setState({ messages: [...this.state.messages, data] });
      console.log(this.state.messages);
    };

  }
  render() {
    
    const keyPressEnter = event => {
      if (event.key === "Enter") {
        event.preventDefault();
        this.socket.emit("message_sent", {
          user: this.state.username,
          message: this.state.message
        });
        this.setState({ message: "" });
      }
    };

    return (
      <div className="container">
        {/* <article className="message is-primary"> */}
        <div className="columns">
          <div className="column">
            <div className="column">
              <div className="section">
                <div className="message-header">chat message go below</div>
                <hr />
                <div className="message ">
                  {this.state.messages.map(message => {
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
                  value={this.state.username}
                  onChange={event => this.setState({ username: event.target.value })}
                  className="form-control"
                />
                <br />
                <input
                  type="text"
                  placeholder="type here to chat"
                  className="column is-half"
                  value={this.state.message}
                  onKeyPress={keyPressEnter}
                  onChange={event => this.setState({ message: event.target.value })}
                />
                <br />
            
              </div>
            </div>
          </div>
        </div>
        {/* </article> */}
      </div>
    );
  }
}

export default Chat;
