import React from 'react'
import './Inbox.css';

import { EmojiEmotions } from '@material-ui/icons';

const Inbox = () => {
    return (
        <div className='inbox'>
            <div className="inbox__input">
                <EmojiEmotions />
                <input placeholder="Enter your message" />
            </div>

        </div>
    )
}

export default Inbox;