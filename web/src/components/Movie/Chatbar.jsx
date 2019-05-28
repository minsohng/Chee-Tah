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
        <article className="message is-dark">
            <div className="columns">
              <div className="column">
                <div className="message-header">Chat Header</div>
                <hr />
                <div className="message" >
                  {this.state.messages.map(message => {
                    return (
                      <div>
                        {message.user}: {message.message}
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="column">
                <input
                  type="text"
                  placeholder="Username"
                  value={this.state.username}
                  onChange={event =>
                    this.setState({ username: event.target.value })
                  }
                  className="form-control"
                />
                <br />
                <input
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
        </article>
      </>
    );
  }
}

export default Chat;
