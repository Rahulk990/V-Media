import React from 'react'
import './ShowEvent.css'

import StyledDialog from '../Misc/StyledDialog'
import { Close } from '@material-ui/icons'
import { IconButton } from '@material-ui/core'

const ShowEvent = ({ open, onClose, origin, heading, description, timestamp }) => {
    return (
        <StyledDialog
            open={open}
            onClose={onClose}
            component={
                <div className='showEvent'>

                    <div className='showEvent__top'>
                        <p>{heading}</p>
                        <IconButton onClick={onClose}>
                            <Close />
                        </IconButton>
                    </div>

                    <div className='showEvent__body'>

                        <div className='showEvent__bodyDescription'>
                            <p>{description}</p>
                        </div>

                        <div className='showEvent__bodyInfo'>

                            <div className='showEvent__bodyInfoSection'>
                                <h3>Posted by:</h3>
                                <p>{origin}</p>
                            </div>

                            <div className='showEvent__bodyInfoSection'>
                                <h3>Event Timing:</h3>
                                <p>{timestamp}</p>
                            </div>
                            
                        </div>

                    </div>

                </div>
            }
        />
    )
}

export default ShowEvent
