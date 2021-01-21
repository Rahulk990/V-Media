import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import './Room.css'

import { Avatar } from '@material-ui/core'
import { selectUser } from '../ReduxStore/appSlice'
import axios from '../Misc/axios'

const Room = ({ roomId, title, usersArray, setRoomInfo }) => {

    const history = useHistory()
    const user = useSelector(selectUser)
    const [newUser, setNewUser] = useState({})

    useEffect(() => {
        if (!title && usersArray) {
            const fetchId = (usersArray[0] === user.userId) ? (usersArray[1]) : (usersArray[0])
            axios.get('retrieve/user', { params: { userId: fetchId } })
                .then((res) => setNewUser(res.data))
        }
        else {
            setNewUser({ name: title, avatar: '' })
        }
    }, [])

    const handleSelect = async () => {
        if (title) history.push('/messenger/g/' + roomId);
        else history.push('/messenger/d/' + roomId);

        await setRoomInfo({
            title: newUser.name,
            avatar: newUser.avatar,
            isGroup: (title) ? ('group') : ('direct'),
            usersArray: usersArray
        })
    }

    return (
        <div className='room' onClick={handleSelect}>
            <Avatar
                className="room__avatar"
                style={{ "height": "25px", "width": "25px" }}
                src={newUser.avatar}
            />

            <p>{newUser.name}</p>

        </div>
    )
}

export default Room
