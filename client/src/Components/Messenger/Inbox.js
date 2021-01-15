import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import './Inbox.css';

import Chat from './Chat.js'
import RoomSettings from './RoomSettings'
import OutsideAlerter from '../Misc/OutsideAlerter'
import { Avatar, IconButton, Tooltip } from "@material-ui/core";
import { EmojiEmotions, MoreVert, Send } from '@material-ui/icons';
import Pusher from 'pusher-js';
import axios from '../Misc/axios';
import { selectUser } from '../ReduxStore/appSlice'

const Inbox = ({ roomId, roomInfo }) => {

    const user = useSelector(selectUser)
    const dispatch = useDispatch()
    const history = useHistory()
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
    const messageSender = async (e) => {
        e.preventDefault();

        const messageData = {
            userId: user.userId,
            username: user.username,
            content: newMessage,
            timestamp: Date.now()
        }

        saveMessage(messageData)
        setNewMessage('')
    }

    const saveMessage = async (messageData) => {
        await axios.post('/upload/message', {
            data: messageData,
            roomId: roomId
        })
            .then((res) => {
                // console.log(res)
            })
    }

    // new-----

    const [messages, setMessages] = useState([]);
    const syncMessages = async () => {
        await axios.get('retrieve/messages', {
            params: {
                roomId: roomId
            }
        })
            .then((res) => {
                if (res) {
                    setMessages(res.data.messagesArray);
                } else {
                    history.replace('/messenger')
                    setMessages(null)
                }
            })
        updateScroll();
    }

    useEffect(() => {
        syncMessages()

        const pusher = new Pusher('d24ba3df0d30f4d2c95e', {
            cluster: 'ap2'
        });

        const channel = pusher.subscribe('messages');
        channel.bind('updated', function (data) {
            syncMessages()
        });

        return () => {
            channel.unbind_all();
            channel.unsubscribe();
        }
    }, [roomId]);
    // -----new------

    //---- time pass function
    function updateScroll() {
        var element = document.getElementsByClassName("inbox__body")[0];
        element.scrollTop = element.scrollHeight;
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
                            component={<RoomSettings isgroup={roomInfo.isgroup} />}
                        />
                        }
                    </div>
                </Tooltip>
            </div>

            <div className='inbox__bodyContainer'>
                <div className='inbox__body'>
                    {
                        messages.map(obj => (
                            <Chat
                                userId={user.userId}
                                authorId={obj.userId}
                                username={obj.username}
                                content={obj.content}
                                timestamp={obj.timestamp} />
                        ))
                    }
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
                            onClick={messageSender}
                            type='submit'
                        />

                    </form>

                    <IconButton >
                        <Send />
                    </IconButton>

                </div>

            </div>

        </div>
    )
}

export default Inbox;


