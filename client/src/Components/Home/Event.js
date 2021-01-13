import React, { useState } from 'react'
import './Event.css'

import ShowEvent from './ShowEvent'

const Event = ({ type, teamId, heading, description, timestamp }) => {

    const [showEvent, setShowEvent] = useState(false)

    const getOrigin = () => {
        if (type === 1) return 'Company';
        else if (type === 2) return ('Team: ' + teamId);
        return 'You';
    }

    const getColor = () => {
        if (type === 1) return ['#E4E6EB', '#404144'];
        else if (type === 2) return ['#E4E6EB', '#404144'];
        return ['#E4E6EB', '#404144'];
    }

    return (
        <div>
            <div
                className='event'
                style={{ 'backgroundColor': getColor()[0] }}
                onClick={() => setShowEvent(true)}
            >

                <div className='event__top' style={{ 'color': getColor()[1] }}>
                    <p>{getOrigin()}</p>
                    <p>{timestamp}</p>
                </div>

                <div className='event__bottom' style={{ 'color': getColor()[1] }}>
                    <p>{heading}</p>
                </div>

            </div >

            { showEvent && <ShowEvent
                open={showEvent}
                onClose={() => setShowEvent(false)}
                origin={getOrigin()}
                heading={heading}
                description={description}
                timestamp={timestamp}
            />
            }

        </div>
    )
}

export default Event
