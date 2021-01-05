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
            <div className = "nav-left"> 
                <FBicon style={{color:"#4267B2", fontSize:"40px"}}/>
                <div className = "search-bar">
                    <SearchIcon />
                    <input placeholder = "Type here"/>
                </div>
            </div>
            <div className = "nav-mid"> 
                <div className = "nav-option">
                <HomeIcon />
                </div>
                <div className = "nav-option">
                <FlagIcon />
                </div>
                <div className = "nav-option">
                <SubscriptionsIcon />
                </div>
                <div className = "nav-option">
                <FlagIcon />
                </div>
                <div className = "nav-option">
                <FlagIcon />
                </div>
            </div>
            <div className = "nav-right"> 
                <div className = "person-info">
                    <Avatar/>
                    <h4>Name</h4> 
                </div>
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
    )
}

export default Navbar;
