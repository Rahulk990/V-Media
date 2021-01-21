import React from 'react'
import './AboutUs.css'
import {
	LinkedIn,
	GitHub,
	PermIdentityRounded,
} from "@material-ui/icons";
import { IconButton, Tooltip } from "@material-ui/core";
const AboutUs = () => {
    return (
        <div className='about'>
            <div className='about__heading'>
                Meet the Team
            </div>
            <div className='container_1'>
                <div>
                <div className='puneet_img'>
                <img src='https://financerewind.com/wp-content/uploads/2020/06/7b790c831c72c5dd3b3275833df09f29.jpg'/>
                </div>
                <div className='logos'>
                    <IconButton>
                        <LinkedIn/>
                    </IconButton>
                    <IconButton>
                        <GitHub/>
                    </IconButton>
                </div>
                </div>
                <div className='puneet_info'>
                I m great best person of the world
                </div>
            </div>
            <div className='container_1'>
                <div className='puneet_info'>
                I m great best person of the world
                </div>
                <div>
                <div className='puneet_img'>
                <img src='https://financerewind.com/wp-content/uploads/2020/06/7b790c831c72c5dd3b3275833df09f29.jpg'/>
                </div>
                <div className='logos'>
                    <IconButton>
                        <LinkedIn/>
                    </IconButton>
                    <IconButton>
                        <GitHub/>
                    </IconButton>
                </div>
                </div>
            </div>
        </div>
    )
}

export default AboutUs
