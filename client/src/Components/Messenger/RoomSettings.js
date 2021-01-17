import React from 'react'
import './RoomSettings.css'

const RoomSettings = ({isGroup}) => {
    if(isGroup === 'group')
    {
        console.log(isGroup);
        return(
            <div className="roomSettings">
            <div className='roomSettings__selectListOption'>
                <p>Group Info</p>
            </div>
            <div className='roomSettings__selectListOption'>
                <p>Add Member</p>
            </div>
            <div className='roomSettings__selectListOption'>
                <p>Exit group</p>
            </div>

        </div>
        )
    }
    else{
        return (
            <div className="roomSettings">
                <div className='roomSettings__selectListOption'>
                    <p>Group Info</p>
                </div>
                <div className='roomSettings__selectListOption'>
                    <p>Clear chat</p>
                </div>
                <div className='roomSettings__selectListOption'>
                    <p>Exit group</p>
                </div>

            </div>
                )
        }
}

export default RoomSettings;