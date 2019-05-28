import React from "react";
import "./movie.scss";
import ReactPlayer from 'react-player';

class Chat extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      message: "",
      messages: [],
     
    };
    this.addMessage = this.addMessage.bind(this);
  }

  addMessage(data) {
    console.log(this, "add message this");
    this.setState({ messages: [...this.state.messages, data] });
  }

  componentDidMount() {
    this.props.socket.on("message_receive", this.addMessage);
  }
  render() {
    const keyPressEnter = event => {
      if (event.key === "Enter") {
        event.preventDefault();
        this.props.socket.emit("message_sent", {
          user: this.state.username,
          message: this.state.message,
          room: this.props.roomId
        });
        this.setState({ message: "" });
      }
    };

    return (
      <>
   <header className="Header">
          <form id="search" className="Search">
            <input type="search" placeholder="Search for a title..." />
          </form>
          </header>
          {/* this div below renders the messages */}
          <div className="all-in-one">
            <div className=" chat-header-sizing">Chat goes here</div>
            <div className="bg-color-change">
              {this.state.messages.map(message => {
                return (
                  <div className="herotom">
                    {message.user}: {message.message}
                  </div>
                );
              })}
            </div>

            <div className="">
              <input
                id="text"
                type="text"
                placeholder="Username"
                value={this.state.username}
                onChange={event =>
                  this.setState({ username: event.target.value })
                }
              />
              <input
                id="text"
                type="text"
                placeholder="type here to chat"
                value={this.state.message}
                onKeyPress={keyPressEnter}
                onChange={event =>
                  this.setState({ message: event.target.value })
                }
              />
            </div>
          </div>
        
      </>
    );
  }
}

export default Chat;
