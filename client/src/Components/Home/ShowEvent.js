import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import './ShowEvent.css'

import StyledDialog from '../Misc/StyledDialog'
import { Close, Delete } from '@material-ui/icons'
import { IconButton } from '@material-ui/core'
import { selectUser } from '../ReduxStore/appSlice'
import deleteEvent from './API/deleteEvent'

const ShowEvent = ({ open, onClose, eventId, heading, description, timestamp }) => {

    const dispatch = useDispatch()
    const user = useSelector(selectUser)

    const handleDelete = async () => {
        onClose()
        await deleteEvent(dispatch, user.userId, eventId)
    }

    return (
        <StyledDialog
            open={open}
            onClose={onClose}
            component={
                <div className='showEvent'>

                    <div className='showEvent__top'>
                        <div className='showEvent__topTitle'>
                            <p>{heading}</p>
                        </div>

                        <div className='showEvent__topIcons'>

                            <IconButton onClick={handleDelete}>
                                <Delete style={{ color: '#FF0000' }} />
                            </IconButton>

                            <IconButton onClick={onClose}>
                                <Close />
                            </IconButton>

                        </div>
                    </div>

                    <div className='showEvent__body'>

                        <div className='showEvent__bodyDescription'>
                            <p>{description}</p>
                        </div>

                        <div className='showEvent__bodyInfo'>

                            <div className='showEvent__bodyInfoSection'>
                                <h3>Posted by:</h3>
                                <p>You</p>
                            </div>

                            <div className='showEvent__bodyInfoSection'>
                                <h3>Event Timing:</h3>
                                <p>{new Date(parseInt(timestamp)).toLocaleString()}</p>
                            </div>

                        </div>

                    </div>

                </div >
            }
        />
    )
}

export default ShowEvent
