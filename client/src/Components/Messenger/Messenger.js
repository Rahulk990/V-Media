import React from 'react'
import './Messenger.css'

import Sidebar from './Sidebar'
import Inbox from './Inbox'
const Messenger = () => {
    return (
        <div className='messenger'>
            <Sidebar />
            <Inbox />
        </div>
    )
}

export default Messenger
