import React from 'react'
import './Room.css'

import { Avatar } from '@material-ui/core'

const Room = ({ roomId, userId, groupId, avatar, title }) => {

    return (
        <div className='room'>

            <Avatar
                className="room__avatar"
                style={{ "height": "25px", "width": "25px" }}
                src={avatar}
            />

            <p>{title}</p>
            
        </div>
    )
}

export default Room
