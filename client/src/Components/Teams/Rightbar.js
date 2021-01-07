import React from 'react'
import EventRow from "../Home/EventRow"
import PeopleIcon from '@material-ui/icons/People'
import { Avatar } from "@material-ui/core";
import './Rightbar.css'

const Rightbar = () => {    
    return (
        <div className='rightbar'>
            <div className="members">
                <div className="person">
                <Avatar/><EventRow/>
                </div>
                <div className="person">
                <Avatar/><EventRow/>
                </div>
                <div className="person">
                <Avatar/><EventRow/>
                </div>
                <div className="person">
                <Avatar/><EventRow/>
                </div>
                <div className="person">
                <Avatar/><EventRow/>
                </div>
            </div>
        </div>
    )
}

export default Rightbar
