import * as React from 'react';
import * as io from 'socket.io-client'

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const socket = io.connect('http://localhost:3001');
    socket.emit('greet', 'hello');
  }

  render() {
    return (
      <>
        <h1>hello world</h1>
      </>
    )
  }
}

export default App;
