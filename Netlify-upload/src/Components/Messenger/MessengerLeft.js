import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import './MessengerLeft.css'

import Room from './Room'
import { IconButton } from "@material-ui/core"
import { Add } from '@material-ui/icons'
import { selectRoomsData } from '../ReduxStore/roomSlice'
import { selectUser } from '../ReduxStore/appSlice'

import addDirectRoom from '../API/addDirectRoom'
import addGroupRoom from '../API/addGroupRoom'

const MessengerLeft = ({ setRoomInfo }) => {

    const user = useSelector(selectUser)
    const roomsData = useSelector(selectRoomsData)
    const [sortedRooms, setSortedRooms] = useState([])
    const [userInput, setUserInput] = useState('')
    const [option, setOption] = useState('direct')

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (userInput) {
            if (option === 'direct') {
                const queryData = {
                    userId: user.userId,
                    userEmail: userInput
                }

                setUserInput('');
                await addDirectRoom(queryData)
            } else {
                const queryData = {
                    userId: user.userId,
                    title: userInput
                }

                setUserInput('');
                await addGroupRoom(queryData)
            }
        }

    }

    const selectOption = (id) => {
        setOption(id);
        document.getElementById('direct').classList.remove("messengerLeft__navbarBtn--active");
        document.getElementById('group').classList.remove("messengerLeft__navbarBtn--active");
        document.getElementById(id).classList.toggle("messengerLeft__navbarBtn--active");
    }

    useEffect(() => {
        const rooms = [...roomsData]
        rooms.sort((a, b) => {
            if (a.messagesArray.length === 0) return 0;
            if (b.messagesArray.length === 0) return 1;
            return b.messagesArray[0].timestamp - a.messagesArray[0].timestamp;
        })
        setSortedRooms(rooms)
    }, [roomsData])


    return (
        <div className='messengerLeft'>

            <div className='messengerLeft__navbar'>

                <div
                    id='direct'
                    className='messengerLeft__navbarBtn messengerLeft__navbarBtn--active'
                    onClick={() => selectOption('direct')}
                >
                    Direct
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

                    <IconButton onClick={handleSubmit}>
                        <Add />
                    </IconButton>
                    <form>

                        <input
                            autoComplete="off"
                            placeholder={(option === 'direct') ? ("Enter User Email") : ("Enter Group Name")}
                            value={userInput}
                            onChange={(e) => setUserInput(e.target.value)}
                        />

                        <button
                            className='submit--hidden'
                            onClick={handleSubmit}
                            type='submit'
                        />

                    </form>

                </div>
            </div>

            <div className='messengerLeft__rooms'>

                {(option === 'direct' && sortedRooms) &&
                    sortedRooms.map(room => (
                        !room.title &&
                        <Room
                            key={room._id}
                            roomId={room._id}
                            usersArray={room.usersArray}
                            setRoomInfo={setRoomInfo}
                            recentMessageUser={(room.messagesArray.length) ? (room.messagesArray[0].username) : ('')}
                            recentMessageContent={(room.messagesArray.length) ? (room.messagesArray[0].content) : ('')}
                        />
                    ))
                }

                {(option === 'group' && sortedRooms) &&
                    sortedRooms.map(room => (
                        room.title &&
                        <Room
                            key={room._id}
                            roomId={room._id}
                            title={room.title}
                            usersArray={room.usersArray}
                            setRoomInfo={setRoomInfo}
                            recentMessageUser={(room.messagesArray.length) ? (room.messagesArray[0].username) : ('')}
                            recentMessageContent={(room.messagesArray.length) ? (room.messagesArray[0].content) : ('')}
                        />
                    ))
                }

            </div>
        </div>
    )
}

export default MessengerLeft
