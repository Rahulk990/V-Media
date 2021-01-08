import React from 'react'
import './HomeLeft.css'

import HomeLeftRow from './HomeLeftRow'
import FlagIcon from '@material-ui/icons/Flag'
import PeopleIcon from '@material-ui/icons/People'

const HomeLeft = () => {
    return (
        <div className='homeLeft'>
            <HomeLeftRow src="S" title='Name'/>
            <HomeLeftRow Icon={FlagIcon} title='Pages'/>
            <HomeLeftRow Icon={PeopleIcon} title='People'/>
        </div>
    )
}

export default HomeLeft
