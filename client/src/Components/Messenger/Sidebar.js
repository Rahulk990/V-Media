import React from 'react'
import './Sidebar.css'
import { Avatar, IconButton } from "@material-ui/core";
import { Search } from '@material-ui/icons';


const Sidebar = () => {

    const isContact = true;

    return (
        <div className='sidebar'>

            <div className='sidebar__info'>

                <div className='sidebar__btn'>
                    Contact
                </div>

                <div className='sidebar__btn'>
                    Groups
                </div>

            </div>

            <div className="message">
            <IconButton >
                <Search />
            </IconButton>
                <input autocomplete="off" placeholder="      Search Message" />
            </div>

            <div className='contact__info'>

                <div className='contact__info__item'>
                    <Avatar />
                </div>

                <div className='contact__info__item'>
                    <Avatar />
                </div>

                <div className='contact__info__item'>
                    <Avatar />
                </div>

                <div className='contact__info__item'>
                    <Avatar />
                </div>

                <div className='contact__info__item'>
                    <Avatar />
                </div>

            </div>
        </div>
    )
}

export default Sidebar
