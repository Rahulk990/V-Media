import { Button } from '@material-ui/core'
import React from 'react'
import './Sidebar.css'
import { Search, Home, People, Telegram, NotificationsActive, ExpandMoreOutlined } from '@material-ui/icons';
import SidebarRow from './SidebarRow'
import EmojiEmotionsIcon from '@material-ui/icons/EmojiEmotions';
import EventRow from "../Home/EventRow"
import { Avatar } from "@material-ui/core";
import './Inbox.css';

const Inbox = () => {

    return (
        <div className='inbox'>

            <div className="inbox__input">
                <EmojiEmotionsIcon/>
                <input placeholder="Enter your message"/>
            </div>

        </div>
    )
}

export default Inbox;