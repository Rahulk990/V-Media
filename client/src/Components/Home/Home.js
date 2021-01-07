import React from 'react'
import './Home.css'

import Sidebar from './Sidebar'
import Feed from '../Feed/Feed'
import Rightbar from './Rightbar'

const Home = () => {
    return (
        <div className='home'>
            <Sidebar />
            <Feed isAdmin={true} />
            <Rightbar />
        </div>
    )
}

export default Home
