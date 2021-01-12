import React from 'react'
import './Messenger.css'

import MessengerLeft from './MessengerLeft'
import Inbox from './Inbox'

const Messenger = () => {
    return (
        <div className='messenger'>
            <MessengerLeft />
            <Inbox />
        </div>
    )
}

export default Messenger
