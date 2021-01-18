import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import './Inbox.css';

import Chat from './Chat.js'
import RoomSettings from './RoomSettings/RoomSettings'
import OutsideAlerter from '../Misc/OutsideAlerter'
import { Avatar, IconButton, Tooltip } from "@material-ui/core";

import { EmojiEmotions, Send} from '@material-ui/icons';

import { selectUser } from '../ReduxStore/appSlice'
import { selectMessagesData } from '../ReduxStore/roomSlice';
import addMessage from '../API/addMessage'

const Inbox = ({ roomId, roomInfo }) => {

    const user = useSelector(selectUser)
    const messages = useSelector(selectMessagesData)


    
    console.log(roomInfo.usersArray);
    const [newMessage, setNewMessage] = useState('')
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (newMessage.length > 0) {
            const requestData = {
                data: {
                    userId: user.userId,
                    username: user.username,
                    content: newMessage,
                    timestamp: Date.now()
                },
                roomId: roomId
            }

            await addMessage(requestData)
            setNewMessage('')
        }
    }

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

                
                    <div
                        className='inbox__navbarRight '
                    >
                    <RoomSettings isGroup={roomInfo.isGroup} roomId={roomId} usersArray={roomInfo.usersArray} />

                    </div>
                
            </div>

            <div className='inbox__bodyContainer'>
                <div className='inbox__bodyContainer2'>
                    <div className='inbox__body'>
                        {
                            messages.map(obj => (
                                <Chat
                                    key={obj.timestamp+obj.content}
                                    userId={user.userId}
                                    authorId={obj.userId}
                                    username={obj.username}
                                    content={obj.content}
                                    timestamp={obj.timestamp} />
                            ))
                        }
                    </div>
                </div>
            </div>

            <div className="inbox__bottom">
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


