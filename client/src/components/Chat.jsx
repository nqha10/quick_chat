import React, { useEffect, useState } from 'react'
import ScrollToBottom from 'react-scroll-to-bottom'
const Chat = ({ socket, username, room, usersList }) => {
    const [currentMessage, setCurrentMessage] = useState("")
    const [messageList, setMessageList] = useState([])

    const sendMessage = async () => {
        if (currentMessage !== "") {
            const messageData = {
                room: room,
                user: username,
                message: currentMessage,
                time: new Date(Date.now()).getHours() + ":" +
                    new Date(Date.now()).getMinutes()
            }
            await socket.emit("send_message", messageData)
            setMessageList([...messageList, messageData])
            setCurrentMessage("")
        }
    }

    useEffect(() => {
        socket.on("receive_message", (data) => {
            setMessageList((list) => [...list, data])
        })
        return () => socket.removeListener('receive_message')
    }, [socket])
    
    return (
        <div>
            <h1>Room {room}</h1>
            <p>Users: {usersList}</p>
            <div className='chat-window'>
                <div className="chat-header">
                    <p>Live Chat</p>
                </div>
                <div className="chat-body">
                    <ScrollToBottom className='message-container'>
                        {messageList.map((messageContent) => {
                            return (
                                <div className='message' id={username === messageContent.user ? "other" : "self"}>
                                    <div>
                                        <div className='message-content'>
                                            <p>{messageContent.message}</p>
                                        </div>
                                        <div className='message-meta'>
                                            <p id="time">{messageContent.time}</p>
                                            <p id="user">{messageContent.user}</p>
                                            <p></p>
                                        </div>
                                    </div>
                                </div>)
                        })}
                    </ScrollToBottom>
                </div>
                <div className="chat-footer">
                    <input value={currentMessage} type="text" placeholder='enter your message ...' onChange={(e) => setCurrentMessage(e.target.value)
                    } onKeyDown={(e) => { e.key === "Enter" && sendMessage() }}
                    />
                    <button onClick={sendMessage}>&#9658;</button>
                </div>
            </div>
        </div>
    )
}

export default Chat