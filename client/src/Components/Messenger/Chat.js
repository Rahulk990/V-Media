import React from 'react'
import './Chat.css'

import { IconButton, Tooltip } from "@material-ui/core";
import { Reply } from '@material-ui/icons';

const Chat = (props) => {
    return (
        <div className='chat'>
            <div className='chat__container'>
                <p> Name </p>

                <div className='chat__message'>
                    <Tooltip title={new Date().toLocaleString()} enterDelay={1000} >

                        <div className='chat__messageBody'>
                            <p> {props.content} </p>
                        </div>
                    </Tooltip>

                    <div className='chat__forward'>
                        <IconButton>
                            <Reply />
                        </IconButton>
                    </div>
                </div>

            </div>
        </div >
    )
}

export default Chat;