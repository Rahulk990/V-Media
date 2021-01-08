import { Button } from '@material-ui/core'
import React from 'react'
import './Sidebar.css'
import { Search, Home, People, Telegram, NotificationsActive, ExpandMoreOutlined } from '@material-ui/icons';
import SidebarRow from './SidebarRow'
import EventRow from "../Home/EventRow"
import { Avatar } from "@material-ui/core";
const Sidebar = () => {

    const isContact = true;

    const handleSubmit = (e) => {
        e.preventDefault();
        // Open Dialog Box
    }

    return (
        <div className='sidebar'>
            <div className='sidebar__info'>
                <div className='sidebar__btn'>
                    Contact
                </div>
                <div className='sidebar__btn'>
                    Teams
                </div>
            </div>

            <div className="message">
                <Search/>
                <input autocomplete="off" placeholder="Search Message" />
            </div>
            <div className='contact__info'>
                {/* <SidebarRow/> */}
                <div className='contact__info__item'>
                    <Avatar/><EventRow/>
                </div>
                
                <div className='contact__info__item'>
                    <Avatar/><EventRow/>
                </div>
                
                <div className='contact__info__item'>
                    <Avatar/><EventRow/>
                </div>
                
                <div className='contact__info__item'>
                    <Avatar/><EventRow/>
                </div>
                
                <div className='contact__info__item'>
                    <Avatar/><EventRow/>
                </div>
                
            </div>
        </div>
    )
}

export default Sidebar
/*
<div className='sidebar__new'>
                <Button onClick={handleSubmit}>
                    Create New Team
                </Button>
            </div>

            <div className='sidebar__heading'>
                <p> Your Teams </p>
            </div>

            {(isContact) ? (
                <div className='sidebar__rows'>
                    <SidebarRow src="S" title='Team1' />
                    <SidebarRow src="S" title='Team1' />
                    <SidebarRow src="S" title='Team1' />
                    <SidebarRow src="S" title='Team1' />
                    <SidebarRow src="S" title='Team1' />
                    <SidebarRow src="S" title='Team1' />
                </div>

            ) : (
                    <div className='sidebar__error'>
                        <p> Nothing to Display </p>
                    </div>
                )}
*/