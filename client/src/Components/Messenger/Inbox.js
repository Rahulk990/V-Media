import React from 'react'
import { useState } from 'react'
import './Inbox.css';
import Groupinfo from './Groupinfo'
import OutsideAlerter from '../Misc/OutsideAlerter'
import { Avatar, IconButton, Tooltip } from "@material-ui/core";
import { EmojiEmotions, MoreVert } from '@material-ui/icons';

const Inbox = () => {
    const [settingsDropdown, setSettingsDropdown] = useState(false);
    const showSettingList = () => {
        setSettingsDropdown(true);
        document.getElementsByClassName('inbox__navbar__right')[0].classList.remove('inbox__navbar__rightSetting--disable');
    }
    const handleSettingSelection = (id) => {
        if (id) {
            // Do related work
        }
        setSettingsDropdown(false);
        document.getElementsByClassName('inbox__navbar__right')[0].classList.add('inbox__navbar__rightSetting--disable');
    }
    return (
        <div className='inbox'>
            <div className='inbox__navbar'>
            <div className='inbox__navbar__left'>
                <Avatar/>
                <p>Group Name</p>
            </div>
            <Tooltip
                        title="Options"
                        enterDelay={1000}
                    >
                        <div
                            className='inbox__navbar__right inbox__navbar__rightSetting--disable'
                            onClick={() => showSettingList()}
                        >
                            <IconButton style={{ 'padding': '0px' }}>
                             <MoreVert/>
                            </IconButton>

                            {settingsDropdown && <OutsideAlerter
                                outsideHandler={handleSettingSelection}
                                component={<Groupinfo />}
                            />
                            }
                        </div>
            </Tooltip>
            </div>
                <div className="inbox__input">
                    <IconButton >
                        <EmojiEmotions />
                    </IconButton>
                    <input placeholder="   Enter your message" />
                </div>

        </div>
    )
}
                   
export default Inbox;


