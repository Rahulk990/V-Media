import React from 'react'
import './Inbox.css';
import { Avatar, IconButton } from "@material-ui/core";
import { EmojiEmotions, MoreVert } from '@material-ui/icons';

const Inbox = () => {
    return (
        <div className='inbox'>
            <div className='inbox__navbar'>
            <div className='inbox__navbar__left'>
                <Avatar/>
                <p>Group Name</p>
            </div>
            <div className='inbox__navbar__right'>
                <IconButton style={{ 'padding': '0px' }}>
                    <MoreVert/>
                </IconButton>
            </div>
            </div>
            <div className="inbox__input">
                <EmojiEmotions />
                <input placeholder="Enter your message" />
            </div>

        </div>
    )
}

export default Inbox;