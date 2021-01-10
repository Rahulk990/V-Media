import React, { useState } from 'react'
import './CreateNewEvent.css'

import StyledDialog from '../Misc/StyledDialog'
import { Close } from '@material-ui/icons'
import { Button, IconButton, TextField } from '@material-ui/core'

const CreateNewEvent = ({ open, onClose }) => {

    const [heading, setHeading] = useState('');
    const [description, setDescription] = useState('');
    const [datetime, setDatetime] = useState('2017-05-24T12:00');

    return (
        <StyledDialog
            open={open}
            onClose={onClose}
            component={
                <div className='createNewEvent'>

                    <div className='createNewEvent__top'>
                        <p>Create New Event</p>
                        <IconButton onClick={onClose}>
                            <Close />
                        </IconButton>
                    </div>

                    <form>
                        <div className='createNewEvent__body'>

                            <div className='createNewEvent__bodyEntry'>
                                <TextField
                                    label="Event Heading"
                                    value={heading}
                                    onChange={(e) => setHeading(e.target.value)}
                                />
                            </div>

                            <div className='createNewEvent__bodyEntry'>
                                <TextField
                                    label="Event Description"
                                    multiline
                                    rowsMax={5}
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                />
                            </div>

                            <div className='createNewEvent__bodyEntry'>
                                <TextField
                                    label="Event Timing"
                                    type="datetime-local"
                                    value={datetime}
                                    onChange={(e) => setDatetime(e.target.value)}
                                />
                            </div>

                        </div>

                        <div className='createNewEvent__bottom'>
                            <Button >
                                <p> Create </p>
                            </Button>
                        </div>

                    </form>
                </div>
            }
        />
    )
}

export default CreateNewEvent
