import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import './Chat.css'

import { IconButton, Tooltip } from "@material-ui/core";
import { Delete, Reply } from '@material-ui/icons';
import removeMessage from '../../API/removeMessage';

const Chat = ({ roomId, userId, message, messagesArray, setMessageReply }) => {

    const [messageReplied, setMessageReplied] = useState(null);

    useEffect(() => {
        if (message && message.replyId) {

            const ind = messagesArray.findIndex(obj => obj._id === message.replyId)
            if (messagesArray[ind]) {
                setMessageReplied({
                    username: messagesArray[ind].username,
                    content: messagesArray[ind].content
                })
            } else {
                setMessageReplied({
                    username: 'Message has been deleted!',
                    content: ''
                })
            }
        }
    }, [])

    const handleReplySelection = () => {
        const messageReply = {
            messageId: message._id,
            username: message.username,
            content: message.content
        }
        setMessageReply(messageReply)
    }

    const handleDelete = async () => {
        await removeMessage(roomId, message._id)
    }


    return (
        <div className={`chat ${userId === message.userId && 'chat__sent'}`}>
            <div className='chat__container'>
                <p> {message.username} </p>

                <div className='chat__message'>
                    <Tooltip
                        title={new Date(parseInt(message.timestamp)).toLocaleString()}
                        enterDelay={1000}
                    >

                        <div className='chat__messageBody'>

                            {messageReplied &&
                                <div className='chat__messageBodyReply'>
                                    <h3> {messageReplied.username} </h3>
                                    <p> {messageReplied.content} </p>
                                </div>
                            }

                            <p> {message.content} </p>
                        </div>

                    </Tooltip>

                    <div className='chat__forward'>

                        <IconButton onClick={handleReplySelection}>
                            <Reply />
                        </IconButton>

                        {userId === message.userId &&
                            <IconButton onClick={handleDelete}>
                                <Delete />
                            </IconButton>
                        }

                    </div>

                </div>

            </div>
        </div >
    )
}

export default Chat;