import React from 'react'
import { auth } from '../../firebase';
import './SettingsList.css'

const SettingsList = ({ outsideHandler }) => {

    return (
        <div className='settingsList'>

            <div className='settingsList__selectListOption'>
                <p>Your Profile</p>
            </div>

            <div
                className='settingsList__selectListOption'
                onClick={() => {
                    auth.signOut();
                    outsideHandler();
                }}
            >
                <p>Logout</p>
            </div>

        </div>
    )
}

export default SettingsList
