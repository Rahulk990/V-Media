import React from 'react'
import "./Navbar.css"

import { Avatar } from "@material-ui/core";
import { IconButton } from "@material-ui/core";
import { Search, Home, People, Telegram, NotificationsActive, ExpandMoreOutlined } from '@material-ui/icons';

const Navbar = () => {
    return (
        <div className="navbar">

            <div className="navbar__left">

                <div className='navbar__logo'>
                    <Avatar src='https://1000logos.net/wp-content/uploads/2016/11/Facebook-logo-500x350.png'/>
                </div>

                {/* <div className='navbar__info'>
                    <Avatar src='https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/1004px-Google_%22G%22_Logo.svg.png'/>
                    <h4>Google</h4>
                </div> */}

                <div className="navbar__input">
                    <Search />
                    <input placeholder="Type here" />
                </div>

            </div>

            <div className="navbar__center">

                <div className="navbar__option active navbar__option--active">
                    <Home />
                </div>

                <div className="navbar__option ">
                    <People />
                </div>

                <div className="navbar__option">
                    <Telegram />
                </div>

            </div>

            <div className="navbar__right">

                <div className="navbar__info">
                    <Avatar />
                    <h4>User Name</h4>
                </div>

                <div className='navbar__settings'>

                    <IconButton style={{ 'padding': '0px' }}>
                        <NotificationsActive />
                    </IconButton>

                    <IconButton style={{ 'padding': '0px' }}>
                        <ExpandMoreOutlined />
                    </IconButton>

                </div>

            </div>

        </div>
    )
}

export default Navbar;
