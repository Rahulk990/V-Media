import React, { useState } from 'react'
import './Inbox.css';

import Chat from './Chat'
import RoomSettings from './RoomSettings'
import OutsideAlerter from '../Misc/OutsideAlerter'
import { Avatar, IconButton, Tooltip } from "@material-ui/core";
import { EmojiEmotions, MoreVert, Send } from '@material-ui/icons';

const Inbox = () => {

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

    const [message, setMessage] = useState('')
    const messageSender = async (e) => {
        e.preventDefault();

        console.log(message);
        setMessage('')
    }


    return (
        <div className='inbox'>
            <div className='inbox__navbar'>

                <div className='inbox__navbarLeft'>
                    <Avatar
                        style={{ "height": "30px", "width": "30px" }}
                    />
                    <p>Group Name</p>
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
                            component={<RoomSettings />}
                        />
                        }
                    </div>
                </Tooltip>
            </div>

            <div className='inbox__body'>
                <Chat />
            </div>

            <div className="inbox__bottom">
                <div className='inbox__bottomInput'>

                    <IconButton >
                        <EmojiEmotions />
                    </IconButton>

                    <form>
                        <input
                            value={message}
                            placeholder="Enter your message"
                            onChange={(e) => setMessage(e.target.value)}
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


