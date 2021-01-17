import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import './MessengerLeft.css'

import Room from './Room'
import { IconButton } from "@material-ui/core"
import { Add } from '@material-ui/icons'
import { selectRoomsData, setData } from '../ReduxStore/roomSlice'
import axios from '../Misc/axios'
import { selectUser } from '../ReduxStore/appSlice'
import Pusher from 'pusher-js';

const MessengerLeft = ({ roomSelector }) => {

    const dispatch = useDispatch()
    const user = useSelector(selectUser)
    const roomsArray = useSelector(selectRoomsData)
    const [userInput, setUserInput] = useState('')
    const [option, setOption] = useState('contact')

    const syncRooms = async () => {
        await axios.get('retrieve/rooms', {
            params: {
                userId: user.userId
            }
        })
            .then((res) => {
                console.log('in response to retrieve Rooms');
                axios.get('retrieve/roomsData', {
                    params: {
                        roomIds: res.data
                    }
                })
                    .then((res2) => {
                        dispatch(setData(res2.data))
                    })
            })
    }

    useEffect(() => {
        syncRooms()

        const pusher = new Pusher('d24ba3df0d30f4d2c95e', {
            cluster: 'ap2'
        });

        const channel = pusher.subscribe('messages');
        channel.bind('inserted', function (data) {
            syncRooms()
        });

        return () => {
            channel.unbind_all();
            channel.unsubscribe();
        }
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (option === 'contact') {
            const queryData = {
                userId: user.userId,
                userEmail: userInput
            }
            await axios.post('/create/roomContact', queryData)
                .then((res) => {
                    if (res.data === 'No such user exists!') {
                        alert(res.data)
                    } else {
                        axios.get('retrieve/roomsData', {
                            params: {
                                roomIds: res.data
                            }
                        })
                            .then((res2) => {
                                dispatch(setData(res2.data))
                            })
                    }
                })
        } else {
            const queryData = {
                userId: user.userId,
                title: userInput
            }
            setUserInput('');
            await axios.post('/create/roomGroup', queryData)
                .then((res) => {
                    axios.get('retrieve/roomsData', {
                        params: {
                            roomIds: res.data
                        }
                    })
                        .then((res2) => {
                            dispatch(setData(res2.data))
                        })
                })
        }

        setUserInput('');
    }

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

                    <IconButton onClick={handleSubmit}>
                        <Add />
                    </IconButton>
                    <form>

                        <input
                            autocomplete="off"
                            placeholder={(option === 'contact') ? ("Enter User Email") : ("Enter Group Name")}
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

                {(option === 'contact' && roomsArray) &&
                    roomsArray.map(room => (
                        !room.title &&
                        <Room
                            roomId={room.roomId}
                            usersArray={room.usersArray}
                            roomSelector={roomSelector}
                        />
                    ))
                }

                {(option === 'group' && roomsArray) &&
                    roomsArray.map(room => (
                        room.title &&
                        <Room
                            roomId={room.roomId}
                            title={room.title}
                            roomSelector={roomSelector}
                        />
                    ))
                }

            </div>
        </div>
    )
}

export default MessengerLeft
