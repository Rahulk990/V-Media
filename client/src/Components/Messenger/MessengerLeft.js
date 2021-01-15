import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import './MessengerLeft.css'

import Room from './Room'
import { IconButton } from "@material-ui/core"
import { Add } from '@material-ui/icons'
import { getRooms } from '../ReduxStore/roomSlice'

const MessengerLeft = () => {

    const roomsArray = useSelector(getRooms)
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
                    <input autocomplete="off" placeholder="Enter User Email" />

                </div>
            </div>

            <div className='messengerLeft__rooms'>

                {(option === 'contact') &&
                    roomsArray.map(room => (
                        !room.title &&
                        <Room
                            roomId={room._id}
                        />
                    ))
                }

                {(option === 'group') &&
                    roomsArray.map(room => (
                        room.title &&
                        <Room
                            roomId={room._id}
                            title={room.title}
                        />
                    ))
                }

            </div>
        </div>
    )
}

export default MessengerLeft
