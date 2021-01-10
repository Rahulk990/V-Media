import React from 'react'
import './Notification.css'

const Notification = ({ title, link }) => {
    return (
        <div className='notification' href={link}>
            <p>{title}</p>
        </div>
    )
}

export default Notification
