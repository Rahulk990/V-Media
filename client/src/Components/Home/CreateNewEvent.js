import React from 'react'
import './CreateNewEvent.css'

import StyledDialog from '../Misc/StyledDialog'
import { Close } from '@material-ui/icons'
import { IconButton } from '@material-ui/core'
const CreateNewEvent = ({ open, onSubmit }) => {
    return (
        <StyledDialog
            open={open}
            onClose={onSubmit}
            component={
                <div className='createNewEvent'>

                    <div className='createNewEvent__top'>
                        <p>Create New Event</p>
                        <IconButton>
                            <Close />
                        </IconButton>
                    </div>

                    <div className='createNewEvent__body'>

                    </div>

                    <div className='createNewEvent__bottom'>

                    </div>

                </div>
            }
        />
    )
}

export default CreateNewEvent
