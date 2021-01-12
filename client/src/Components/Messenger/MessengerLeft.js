import React, { useState } from 'react'
import './MessengerLeft.css'

import Room from './Room'
import { Avatar, IconButton } from "@material-ui/core";
import { Add } from '@material-ui/icons';

const contactRooms = [
    {
        'roomId': '1234',
        'userId': '12334',
        'avatar': '',
        'title': 'Rahul'
    },
    {
        'roomId': '1234',
        'userId': '12334',
        'avatar': '',
        'title': 'Puneet'
    },
    {
        'roomId': '1234',
        'userId': '12334',
        'avatar': '',
        'title': 'Pagal'
    }
]

const groupRooms = [
    {
        'roomId': '1234',
        'groupId': '12334',
        'title': 'A4'
    },
    {
        'roomId': '1234',
        'groupId': '12334',
        'title': 'GEC'
    },
    {
        'roomId': '1234',
        'groupId': '12334',
        'title': 'OEC'
    }
]

const MessengerLeft = () => {

    const [option, setOption] = useState('contact')
    const selectOption = (id) => {
        setOption(id);
        document.getElementById('contact').classList.remove("messengerLeft__navbarBtn--active");
        document.getElementById('group').classList.remove("messengerLeft__navbarBtn--active");
        document.getElementById(id).classList.toggle("messengerLeft__navbarBtn--active");
    }

    return (
        <div className='messengerLeft'>

            <div className='messengerLeft__navbar'>

                <div
                    id='contact'
                    className='messengerLeft__navbarBtn messengerLeft__navbarBtn--active'
                    onClick={() => selectOption('contact')}
                >
                    Contact
                </div>

                <div
                    id='group'
                    className='messengerLeft__navbarBtn'
                    onClick={() => selectOption('group')}
                >
                    Groups
                </div>

            </div>

            <div className="messengerLeft__search">
                <div className='messengerLeft__searchInput'>

                    <IconButton >
                        <Add />
                    </IconButton>
                    <input autocomplete="off" placeholder="Enter UserID" />

                </div>
            </div>

            <div className='messengerLeft__rooms'>

                {(option === 'contact') && contactRooms.map(room => (
                    <Room
                        roomId={room.roomId}
                        userId={room.userId}
                        avatar={room.avatar}
                        title={room.title}
                    />
                ))
                }

                {(option === 'group') && groupRooms.map(room => (
                    <Room
                        roomId={room.roomId}
                        groupId={room.groupId}
                        title={room.title}
                    />
                ))
                }

            </div>
        </div>
    )
}

export default MessengerLeft
