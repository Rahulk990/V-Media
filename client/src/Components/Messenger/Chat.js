import React, { useEffect } from 'react'
import './Chat.css'

import { IconButton, Tooltip } from "@material-ui/core";
import { Reply } from '@material-ui/icons';

const Chat = ({ userId, authorId, username, content, timestamp }) => {

    return (
        <>
            {(userId === authorId) ? (
                <div className='chat chat__sent'>
                    <div className='chat__container'>
                        <p> {username} </p>

                        <div className='chat__message'>
                            <Tooltip title={new Date(parseInt(timestamp)).toLocaleString()} enterDelay={1000} >

                                <div className='chat__messageBody'>
                                    <p> {content} </p>
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
            ) : (
                    <div className='chat'>
                        <div className='chat__container'>
                            <p> {username} </p>

                            <div className='chat__message'>
                                <Tooltip title={new Date(parseInt(timestamp)).toLocaleString()} enterDelay={1000} >

                                    <div className='chat__messageBody'>
                                        <p> {content} </p>
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
                )}
        </>
    )
}

export default Chat;