import React from 'react'
import './Event.css'

const Event = ({ type, teamId, heading, description, timestamp }) => {

    const getOrigin = () => {
        if (type === 1) return 'Individual';
        else if (type === 2) return ('Team: ' + teamId);
        return 'Company';
    }

    const getColor = () => {
        if (type === 1) return ['#E4E6EB', '#404144'];
        else if (type === 2) return ['#E4E6EB', '#404144'];
        return ['#E4E6EB', '#404144'];
    }

    return (
        <div className='event' style={{ 'backgroundColor': getColor()[0] }}>

            <div className='event__top' style={{ 'color': getColor()[1] }}>
                <p>{getOrigin()}</p>
                <p>{timestamp}</p>
            </div>

            <div className='event__bottom' style={{ 'color': getColor()[1] }}>
                <p>{heading}</p>
            </div>

        </div >
    )
}

export default Event
