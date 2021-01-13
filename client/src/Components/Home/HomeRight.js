import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import './HomeRight.css'

import Event from './Event'
import CreateNewEvent from './CreateNewEvent'
import OutsideAlerter from '../Misc/OutsideAlerter'
import { Button } from '@material-ui/core'
import { Add, ExpandMore } from '@material-ui/icons'
import { selectUser } from '../ReduxStore/appSlice'
import axios from '../Misc/axios'


const HomeRight = () => {

    const [eventData, setEventData] = useState([])
    const user = useSelector(selectUser)

    const syncEvents = () => {
        axios.get('retrieve/events', {
            params: {
                userId: user.userId
            }
        })
            .then((res) => {
                setEventData(res.data);
            })
    }

    useEffect(() => {
        syncEvents();
    }, [])

    const [newEvent, setNewEvent] = useState(false);
    const [option, setOption] = useState('Overall');
    const [optionDropdown, setOptionDropdown] = useState(false);

    const checkEvent = (type) => {
        if (option === 'Overall') return true;
        if (option === 'Personal' && !type) return true;
        if (option === 'Team' && type === 2) return true;
        if (option === 'Company' && type === 3) return true;
        return false;
    }

    const showDropdown = () => {
        document.getElementsByClassName('homeRight__select')[0].classList.remove('homeRight__select--disable');
        setOptionDropdown(true);
    }

    const handleSelection = (value) => {
        (value && setOption(value));
        document.getElementsByClassName('homeRight__select')[0].classList.add('homeRight__select--disable');
        setOptionDropdown(false);
    }

    return (
        <div className='homeRight'>

            <div className='homeRight__info'>
                <p> Upcoming Events </p>
            </div>

            <div className='homeRight__new'>
                <Button onClick={() => { setNewEvent(true) }}>
                    <Add />
                    <p> Create New Event</p>
                </Button>
            </div>

            { newEvent && <CreateNewEvent
                open={newEvent}
                onClose={() => setNewEvent(false)}
                reSync={setEventData}
                userId={user.userId}
            />
            }

            <div className='homeRight__select homeRight__select--disable'>
                <Button onClick={showDropdown}>
                    <p> {option} </p>
                    <ExpandMore />
                </Button>
            </div>

            { optionDropdown && <OutsideAlerter
                outsideHandler={handleSelection}
                component={
                    <div className='homeRight__selectList'>

                        <div className='homeRight__selectListOption' onClick={() => handleSelection('Overall')}>
                            <p>Overall</p>
                        </div>

                        <div className='homeRight__selectListOption' onClick={() => handleSelection('Personal')}>
                            <p>Personal</p>
                        </div>

                        <div className='homeRight__selectListOption' onClick={() => handleSelection('Team')}>
                            <p>Team</p>
                        </div>

                        <div className='homeRight__selectListOption' onClick={() => handleSelection('Company')}>
                            <p>Company</p>
                        </div>

                    </div>
                }
            />
            }


            <div className='homeRight__eventList'>
                {eventData.map(event => (
                    checkEvent(event.type) &&
                    <Event
                        type={event.type}
                        teamId={event.teamId}
                        heading={event.heading}
                        description={event.description}
                        timestamp={event.timestamp}
                    />
                ))
                }
            </div>

        </div>
    )
}

export default HomeRight
