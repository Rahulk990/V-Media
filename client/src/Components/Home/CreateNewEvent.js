import React, { useState } from 'react'
import './CreateNewEvent.css'

import StyledDialog from '../Misc/StyledDialog'
import { Close } from '@material-ui/icons'
import { Button, IconButton, TextField } from '@material-ui/core'
import axios from '../Misc/axios'

const CreateNewEvent = ({ open, onClose, reSync, userId }) => {

    const [heading, setHeading] = useState('');
    const [description, setDescription] = useState('');
    const [datetime, setDatetime] = useState('2021-01-01T12:00');

    const handleSubmit = async (e) => {
        e.preventDefault();

        const eventData = {
            heading: heading,
            description: description,
            timestamp: datetime
        }

        savePost(eventData)
        onClose();
    }

    const savePost = async (eventData) => {
        await axios.post('/upload/event', {
            data: eventData,
            userId: userId
        })
            .then((res) => {
                reSync(res.data.eventsArray)
            })
    }

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
                                    onChange={(e) => { setDatetime(e.target.value); console.log(e.target.value) }}
                                />
                            </div>

                        </div>

                        <div className='createNewEvent__bottom'>
                            <Button
                                type='submit'
                                onClick={handleSubmit}>
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
