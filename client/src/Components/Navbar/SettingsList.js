import React from 'react'
import { auth } from '../../firebase';
import './SettingsList.css'

const SettingsList = ({ history }) => {

    return (
        <div className='settingsList'>

            <div className='settingsList__selectListOption'>
                <p>Your Profile</p>
            </div>

            <div
                className='settingsList__selectListOption'
                onClick={() => {
                    history.replace('/login')
                    auth.signOut();
                }}
            >
                <p>Logout</p>
            </div>

        </div>
    )
}

export default SettingsList
