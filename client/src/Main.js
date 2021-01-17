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

const Main = () => {

    const history = useHistory()
    const dispatch = useDispatch()
    const user = useSelector(selectUser)
    const roomsData = useSelector(selectRooms)

    useEffect(() => {
        
        if (!user) {
            history.replace('/login')
        } else {

            // Fetch All Data
            fetchAllData(dispatch, user.userId, roomsData)

            // Setup Sockets
            const socket = socketIOClient('http://localhost:8000')
            socket.on('refresh', data => fetchPosts(dispatch))

            return () => {
                socket.disconnect()
            }
        }

    }, [])

    return (
        <>
            { user && <>
                <Navbar />
                <div className='app__body'>
                    <Router>
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
                    </Router>

                </div>
            </>
            }
        </>
    )
}

export default Main
