import * as React from "react";
import './chat.scss'
const {Component} = React;

interface State {
  messages: Array<{user: string, message: string, id: string}>,
  message: string
}

interface Props {
  socket: any,
  roomId: string,
  username: string
}

class Chat extends Component<Props, State> {
  constructor(props) {
    super(props);

    this.state = {
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

  componentDidUpdate() {
    const chatBox = document.getElementById('chats')
    chatBox.scrollTo(0, chatBox.scrollHeight);
  }

  render() {
    const keyPressEnter = event => {
      if (event.key === "Enter") {
        event.preventDefault();
        this.props.socket.emit("message_sent", {
          id: this.props.socket.id,
          user: this.props.username,
          message: this.state.message,
          room: this.props.roomId
        });
        this.setState({ message: "" });
      }
    };

    return (
      <>
        <div id='viewport'>
          <div className="chatbox">
            <div className="chats" id='chats'>
              <ul>
                <li>
                  <div className="msg him">
                    <span className="partner">Gupi Gain</span>
                      Mora nai Rajar Jamai!
                  </div>
                </li>
                <li>
                  <div className="msg you">
                    <span className="partner">Bagha Bain</span>
                    Jamai!
                  </div>
                </li>
                <li>
                  <div className="msg him">
                    <span className="partner">Gupi Gain</span>
                    Mora Khai Dai Ghuri Firi!
                  </div>
                </li>
                <li>
                  <div className="msg him">
                    <span className="partner">Gupi Gain</span>
                    Aha ki Moder Chiri!
                  </div>
                </li>
                {this.state.messages.map(message => {
                  return (
                  <li>
                  <div className={message.id === this.props.socket.id ? 'msg you' : 'msg him'}>
                    <span className="partner">{message.user}</span>
                    {message.message}
                  </div>
                  </li>
                  )
                })}
              </ul>
            </div>
            <div className="sendBox">
              <input type="text"
                id="text"
                placeholder="type here to chat"
                value={this.state.message}
                onKeyPress={keyPressEnter}
                onChange={event =>
                  this.setState({ message: event.target.value })}/>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default Chat;
