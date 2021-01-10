import React from 'react'
import './NotificationList.css'

import Notification from './Notification'

const NotificationList = () => {
    return (
        <div className='notificationList'>

            <Notification
                title='You got likes on your post'
                link='#'
            />

            <Notification
                title='Someone commented on your post'
                link='#'
            />

        </div>
    )
}

export default NotificationList
