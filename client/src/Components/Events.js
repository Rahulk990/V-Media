import React from 'react'
import './Events.css'

import EventRow from './EventRow'

const Events = () => {
    return (
        <div className='event'>

            <div className='event__top'>

            </div>

            <div className='event__details'>
                <EventRow />
                <EventRow />
                <EventRow />
                <EventRow />
                <EventRow />
            </div>

        </div>
    )
}

export default Events
