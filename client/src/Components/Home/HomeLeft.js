import React from 'react'
import { useSelector } from 'react-redux'
import './HomeLeft.css'

import HomeLeftRow from './HomeLeftRow'
import FlagIcon from '@material-ui/icons/Flag'
import PeopleIcon from '@material-ui/icons/People'
import { selectUser } from '../ReduxStore/appSlice'

const HomeLeft = () => {

    const user = useSelector(selectUser)

    return (
        <div className='homeLeft'>
            <HomeLeftRow src={user.avatarSrc} title={user.username} />
            <HomeLeftRow Icon={FlagIcon} title='Pages' />
            <HomeLeftRow Icon={PeopleIcon} title='People' />
        </div>
    )
}

export default HomeLeft
