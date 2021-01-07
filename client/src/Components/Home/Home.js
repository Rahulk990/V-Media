import React from 'react'
import './Home.css'

import Sidebar from './Sidebar'
import Feed from './Feed'
import Rightbar from './Rightbar'

const Home = () => {
    return (
        <div className='home'>
            <Sidebar />
            <Feed />
            <Rightbar />
        </div>
    )
}

export default Home
