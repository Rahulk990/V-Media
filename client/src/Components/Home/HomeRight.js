import React, { useState } from 'react'
import './HomeRight.css'

import Event from './Event'
import OutsideAlerter from '../Misc/OutsideAlerter'
import { Button } from '@material-ui/core'
import { Add, ExpandMore } from '@material-ui/icons'

const events = [
    {
        'type': 3,
        'teamId': '',
        'heading': "Engi Fest 21",
        'description': 'Happ',
        'timestamp': 'Feb. 21'
    },
    {
        'type': 2,
        'teamId': 'CO',
        'heading': "Mid Sem",
        'description': 'Happ',
        'timestamp': 'Feb. 21'
    },
    {
        'type': 1,
        'teamId': '',
        'heading': "Study",
        'description': 'Happ',
        'timestamp': 'Jan 21'
    }
]

const HomeRight = () => {

    const [option, setOption] = useState('Overall');
    const [optionDropdown, setOptionDropdown] = useState(false);

    const checkEvent = (type) => {
        if (option === 'Overall') return true;
        if (option === 'Individual' && type === 1) return true;
        if (option === 'Team' && type === 2) return true;
        if (option === 'Company' && type === 3) return true;
        return false;
    }

    const handleNew = (e) => {
        e.preventDefault();
    }

    const showDialog = () => {
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
                <Button onClick={handleNew}>
                    <Add />
                    <p> Create New Event</p>
                </Button>
            </div>

            <div className='homeRight__select homeRight__select--disable'>
                <Button onClick={showDialog}>
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

                        <div className='homeRight__selectListOption' onClick={() => handleSelection('Individual')}>
                            <p>Individual</p>
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
                {events.map(event => (
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
