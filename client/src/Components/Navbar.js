import React from 'react'
import "./Navbar.css"
import FBicon from '@material-ui/icons/Facebook';
import SearchIcon from '@material-ui/icons/Search';
import HomeIcon from '@material-ui/icons/Home';
import FlagIcon from '@material-ui/icons/Flag';
import SubscriptionsIcon from '@material-ui/icons/Subscriptions';
import {Avatar} from "@material-ui/core";
import {IconButton} from "@material-ui/core";
const Navbar = () => {
    return (
        <div className = "navbar">
            <div className = "navbar__left"> 
                <FBicon style={{color:"#4267B2", fontSize:"40px"}}/>
                <div className = "navbar__input">
                    <SearchIcon />
                    <input placeholder = "Type here"/>
                </div>
            </div>
            <div className = "navbar__center"> 
                <div className = "navbar__option active navbar__option--active">
                <HomeIcon />
                </div>
                <div className = "navbar__option ">
                <FlagIcon />
                </div>
                <div className = "navbar__option">
                <SubscriptionsIcon />
                </div>
                <div className = "navbar__option">
                <FlagIcon />
                </div>
                <div className = "navbar__option">
                <FlagIcon />
                </div>
            </div>
            <div className = "navbar__right"> 
                <div className = "navbar__info">
                    <Avatar/>
                    <h4>Name</h4> 
                </div>
                <div className="temp">
                    <IconButton>
                    <SubscriptionsIcon />
                    </IconButton>
                    <IconButton>
                    <FlagIcon />
                    </IconButton>
                    <IconButton>
                    <FlagIcon />
                    </IconButton>
                </div>
            </div>
        </div>
    )
}

export default Navbar;
