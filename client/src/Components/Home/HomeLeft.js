import React from 'react'
import { useSelector } from 'react-redux'
import './HomeLeft.css'

import HomeLeftRow from './HomeLeftRow'
import {Telegram, InfoOutlined} from '@material-ui/icons'
import { selectUser } from '../ReduxStore/appSlice'

const HomeLeft = () => {

    const user = useSelector(selectUser)

    return (
        <div className='homeLeft'>
            <HomeLeftRow src={user.avatarSrc} title={user.username} />
            <HomeLeftRow Icon={Telegram} title='Messenger' />
            <HomeLeftRow Icon={InfoOutlined} title='About Us' />
        </div>
    )
}

export default HomeLeft
