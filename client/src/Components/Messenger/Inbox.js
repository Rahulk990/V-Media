import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import './Inbox.css';

import Chat from './Chat.js'
import RoomSettings from './RoomSettings'
import OutsideAlerter from '../Misc/OutsideAlerter'
import { Avatar, IconButton, Tooltip } from "@material-ui/core";
import { EmojiEmotions, MoreVert, Send } from '@material-ui/icons';
import { selectUser } from '../ReduxStore/appSlice'
import { selectMessagesData } from '../ReduxStore/roomSlice';
import addMessage from '../API/addMessage'

const Inbox = ({ roomId, roomInfo }) => {

    const user = useSelector(selectUser)
    const messages = useSelector(selectMessagesData)


    const [settingsDropdown, setSettingsDropdown] = useState(false);
    const showSettingList = () => {
        setSettingsDropdown(true);
        document.getElementsByClassName('inbox__navbarRight')[0].classList.remove('inbox__navbarRight--disable');
    }

    const handleSettingSelection = (id) => {
        if (id) {
            // Do related work
        }
        setSettingsDropdown(false);
        document.getElementsByClassName('inbox__navbarRight')[0].classList.add('inbox__navbarRight--disable');
    }

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

            console.log(roomId);
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

                <Tooltip
                    title="Options"
                    enterDelay={1000}
                >
                    <div
                        className='inbox__navbarRight inbox__navbarRight--disable'
                        onClick={() => showSettingList()}
                    >
                        <IconButton >
                            <MoreVert />
                        </IconButton>

                        {settingsDropdown && <OutsideAlerter
                            outsideHandler={handleSettingSelection}
                            component={<RoomSettings isGroup={roomInfo.isGroup} />}
                        />
                        }

                    </div>
                </Tooltip>
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


