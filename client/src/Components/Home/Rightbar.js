import React from 'react'
import './Rightbar.css'
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import Event from './Events'

const Rightbar = () => {

    return (
        <div className='rightbar'>

            <div className="scroll_div">
                <Event />            
            </div>
        </div>
    )
}

export default Rightbar
