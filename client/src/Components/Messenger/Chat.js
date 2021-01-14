import React from 'react'
import './Chat.css'

import { Avatar, IconButton } from "@material-ui/core";

const Chat = (props) =>{
    console.log("called chat");
    return (
        <div className='chat__message chat__message__received'>
            <div className='author__avatar'>
                <Avatar/>
            </div>
            <div className='chat__message__body'>
                <div className='author__name'>
                    Puneet
                </div>
                <div className='message__content'>
                    {props.content}
                </div>
            </div>
            <div className='chat__message__timestamp'>
                {new Date().toLocaleDateString()}
            </div>
            <div>
                <IconButton>
                    
                </IconButton>
            </div>
        </div>

    )
}

export default Chat;