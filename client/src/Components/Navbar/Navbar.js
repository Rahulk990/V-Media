import React from 'react'
import "./Navbar.css"
import { centerOptionHandler } from './TabHandler'

import { Avatar, Tooltip, Zoom, IconButton } from "@material-ui/core";
import { Search, Home, People, Telegram, NotificationsActive, ExpandMoreOutlined } from '@material-ui/icons';

const Navbar = ({ setPath }) => {

    const centerOnClickHandler = (id) => {
        setPath(id);
        centerOptionHandler(id);
    }

    return (
        <div className="navbar">

            <div className="navbar__left">

                <div className='navbar__logo'>
                    <Avatar src='https://1000logos.net/wp-content/uploads/2016/11/Facebook-logo-500x350.png' />
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

                <Tooltip
                    TransitionComponent={Zoom}
                    title="Home"
                    enterDelay={500}
                    leaveDelay={200}
                >
                    <div
                        id='home'
                        className="navbar__option navbar__option--active"
                        onClick={() => centerOnClickHandler('home')}
                    >
                        <Home />
                    </div>
                </Tooltip>

                <Tooltip
                    TransitionComponent={Zoom}
                    title="Teams"
                    enterDelay={500}
                    leaveDelay={200}
                >
                    <div
                        id='teams'
                        className="navbar__option "
                        onClick={() => centerOnClickHandler('teams')}
                    >
                        <People />
                    </div>
                </Tooltip>

                <Tooltip
                    TransitionComponent={Zoom}
                    title="Messenger"
                    enterDelay={500}
                    leaveDelay={200}
                >
                    <div
                        id='messenger'
                        className="navbar__option"
                        onClick={() => centerOnClickHandler('messenger')}
                    >
                        <Telegram />
                    </div>
                </Tooltip>

            </div>

            <div className="navbar__right">

                <div className="navbar__info">
                    <Avatar style={{ "height": "25px", "width": "25px" }} />
                    <p>Username</p>
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

        </div >
    )
}

export default Navbar;
