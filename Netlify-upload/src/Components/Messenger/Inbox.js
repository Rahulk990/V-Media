import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import './Inbox.css';

import Chat from './Chat/Chat.js'
import RoomSettings from './RoomSettings/RoomSettings'
import ChatReply from './Chat/ChatReply'
import { Avatar, IconButton } from "@material-ui/core";
import { EmojiEmotions, Send } from '@material-ui/icons';

import { selectUser } from '../ReduxStore/appSlice'
import { selectRoomsData } from '../ReduxStore/roomSlice';
import addMessage from '../API/addMessage'
import { useHistory } from 'react-router-dom';

const Inbox = ({ roomId, roomInfo }) => {

    const history = useHistory()
    const user = useSelector(selectUser)
    const roomsData = useSelector(selectRoomsData)

    const [messages, setMessages] = useState([])
    const [usersArray, setUsersArray] = useState([])
    useEffect(() => {
        if (roomsData && roomId) {
            const ind = roomsData.findIndex(obj => obj._id === roomId)
            if (roomsData[ind]) {
                setMessages(roomsData[ind].messagesArray);
                setUsersArray(roomsData[ind].usersArray)
            } else {
                history.replace('/messenger')
            }
        }
    }, [roomId, roomsData])


    const [newMessage, setNewMessage] = useState('')
    const handleSubmit = (e) => {
        e.preventDefault();

        const messageText = newMessage.trim()
        if (messageText.length > 0) {
            const requestData = {
                data: {
                    userId: user.userId,
                    username: user.username,
                    content: messageText,
                    timestamp: Date.now(),
                    replyId: (messageReply) ? (messageReply.messageId) : (null)
                },
                roomId: roomId
            }

            addMessage(requestData)
            setNewMessage('')
        }
    }

    const [messageReply, setMessageReply] = useState(null)
    useEffect(() => {
        setMessageReply(null)
    }, [messages])

    return (
        <div className='inbox'>
            <div className='inbox__navbar'>

                <div className='inbox__navbarLeft'>
                    <Avatar
                        style={{ "height": "30px", "width": "30px" }}
                        src={roomInfo.avatar}
                    />
                    <p>{roomInfo.title}</p>
                </div>


                <div className='inbox__navbarRight' >
                    <RoomSettings
                        roomId={roomId}
                        isGroup={roomInfo.isGroup}
                        usersArray={usersArray}
                    />
                </div>

            </div>

            <div className='inbox__bodyContainer'>
                <div className='inbox__bodyContainer2'>
                    <div className='inbox__body'>
                        {
                            messages.map(message => (
                                <Chat
                                    key={message.timestamp + message.content}
                                    roomId={roomId}
                                    userId={user.userId}
                                    message={message}
                                    messagesArray={messages}
                                    setMessageReply={setMessageReply}
                                />
                            ))
                        }
                    </div>
                </div>
            </div>

            <div className="inbox__bottom">

                {messageReply &&
                    <ChatReply
                        messageReply={messageReply}
                        setMessageReply={setMessageReply}
                    />
                }

                <div className='inbox__bottomInput'>

                    <IconButton >
                        <EmojiEmotions />
                    </IconButton>

                    <form>

                        <input
                            value={newMessage}
                            placeholder="Enter your message"
                            onChange={(e) => setNewMessage(e.target.value)}
                        />
                        <button
                            className='submit--hidden'
                            onClick={handleSubmit}
                            type='submit'
                        />

                    </form>

                    <IconButton onClick={handleSubmit}>
                        <Send />
                    </IconButton>

                </div>

            </div>

        </div>
    )
}

export default Inbox;

