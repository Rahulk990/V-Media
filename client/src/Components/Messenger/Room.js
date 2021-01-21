import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import './Room.css'

import { Avatar } from '@material-ui/core'
import { selectUser } from '../ReduxStore/appSlice'
import axios from '../Misc/axios'

const Room = ({ roomId, title, usersArray, setRoomInfo, recentMessageUser, recentMessageContent }) => {

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

    const sliceMessage = () => {
        if(recentMessageContent.length <= 20) {
            return recentMessageContent;
        } else {
            return recentMessageContent.slice(0, 20) + '...';
        }
    }

    return (
        <div className='room' onClick={handleSelect}>
            <Avatar
                className="room__avatar"
                style={{ "height": "30px", "width": "30px" }}
                src={newUser.avatar}
            />

            <div className='room__content'>
                <p>{newUser.name}</p>

                {recentMessageUser.length > 0 &&
                    <div className='room__contentRecent'>
                        <h3>{recentMessageUser + ':'}</h3>
                        <p>{sliceMessage()}</p>
                    </div>
                }

            </div>
        </div>
    )
}

export default Room
