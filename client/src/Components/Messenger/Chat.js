import React from 'react'
import './Chat.css'

import { Avatar } from "@material-ui/core";

const Chat = () =>{
    return (
        <div className='chat__message chat__message__receiver'>
            <div className='author__avatar'>
                <Avatar/>
            </div>
            <div className='chat__message__body'>
                <div className='author__name'>
                    Puneet
                </div>
                <div className='message__content'>
                    hello there
                </div>
            </div>
            <div className='chat__message__timestamp'>
                {/* {new Date().toUTCString()} */}
            </div>
        </div>
    )
}

export default Chat;