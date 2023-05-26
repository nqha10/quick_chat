import './App.css';
import io from 'socket.io-client'
import { useEffect, useState } from 'react'
import Chat from './components/Chat'
const socket = io.connect("http://localhost:3001")

function App() {
  const [username, setUsername] = useState("")
  const [room, setRoom] = useState("")
  const [displayChat, setDisplayChat] = useState(false)

  const joinRoom = () => {
    if (username !== "" && room !== "") {
      socket.emit("join_room", room)
      setDisplayChat(true)
    }
  }

  return (
    <div className='App'>
      {
        !displayChat ?
          <div className='joinChatContainer'>
            <h1>Join A Chat</h1>
            <input type="text" placeholder='your name here ...' onChange={(e) => setUsername(e.target.value)}></input>
            <input type="text" placeholder='room id here ...' onChange={(e) => setRoom(e.target.value)}></input>
            <button onClick={joinRoom}>Join Room</button>
          </div>
          :
          <Chat socket = {socket} username={username} room={room} />
      }
    </div>
  );
}

export default App;
