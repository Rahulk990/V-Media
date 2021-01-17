import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter as Router, Switch, Route, useHistory } from "react-router-dom";

import Navbar from './Components/Navbar/Navbar'
import Home from './Components/Home/Home'
import Messenger from './Components/Messenger/Messenger'
import Profile from './Components/Profile/Profile'
import fetchAllData from './Components/API/fetchAllData'
import { selectRooms, selectUser } from './Components/ReduxStore/appSlice';
import socketIOClient from 'socket.io-client'
import fetchPosts from './Components/API/fetchPosts';
import fetchUserRooms from './Components/API/fetchUserRooms'
import fetchRoomsData from './Components/API/fetchRoomsData'
import Pusher from 'pusher-js';
import { selectCurrentRoom } from './Components/ReduxStore/roomSlice';
import fetchMessages from './Components/API/fetchMessages';

const Main = () => {

    const history = useHistory()
    const dispatch = useDispatch()
    const user = useSelector(selectUser)
    const roomsData = useSelector(selectRooms)
    const currentRoom = useSelector(selectCurrentRoom)

    const syncMessages = async (roomId) => {
        console.log(roomId)
        await fetchMessages(dispatch, history, roomId)
    }


    useEffect(() => {

        if (!user) {
            history.replace('/login')
        } else {

            // Fetch All Data
            fetchAllData(dispatch, user.userId, roomsData)

            // Setup Sockets
            const socket = socketIOClient('http://localhost:8000')
            socket.on('refresh', data => fetchPosts(dispatch))

            // Setup Pusher
            const pusher = new Pusher('d24ba3df0d30f4d2c95e', { cluster: 'ap2' });

            const channel = pusher.subscribe('messages');
            channel.bind('inserted', function (data) {
                fetchUserRooms(dispatch, user.userId)
            });

            channel.bind('updated', function (data) {
                if (roomsData.includes(data._id)) {
                    console.log(data, currentRoom)

                }
            });

            return () => {
                socket.disconnect()
                channel.unbind_all();
                channel.unsubscribe();
            }
        }
    }, [])

    useEffect(() => {
        fetchRoomsData(dispatch, roomsData)
    }, [roomsData])

    useEffect(() => {
        syncMessages(currentRoom)
    }, [currentRoom])

    return (
        <Router>
            {user && <>
                <Navbar />
                <div className='app__body'>
                    <Switch>

                        <Route exact path="/home">
                            <Home />
                        </Route>

                        <Route exact path="/profile">
                            <Profile />
                        </Route>

                        <Route path="/messenger">
                            <Messenger />
                        </Route>

                    </Switch>

                </div>
            </>
            }
        </Router>
    )
}

export default Main
