import React from 'react'
import './Room.css'

import { Avatar } from '@material-ui/core'
import { useHistory } from 'react-router-dom'

const Room = ({ roomId, title }) => {

    const history = useHistory()
    return (
        <div className='room' onClick={() => history.replace('/messenger/' + roomId)}>
            <Avatar
                className="room__avatar"
                style={{ "height": "25px", "width": "25px" }}
                src=''
            />

            <p>{title}</p>

        </div>
    )
}

export default Room
