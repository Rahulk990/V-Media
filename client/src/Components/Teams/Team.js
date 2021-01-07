import React from 'react'
import './Team.css'

import Sidebar from './Sidebar'
import Feed from './Feed'
import Rightbar from './Rightbar'
import { Autorenew } from '@material-ui/icons'

const Team = () => {

    const isSelected = false;

    return (
        <div className='team'>
            <Sidebar />
            {(isSelected)? (
                <Feed />
            ):(
                <div className='team__select'>
                    <Autorenew />
                    <p>Select a team to get Feed</p>
                </div>
            )}
            <Rightbar />

        </div>
    )
}

export default Team
