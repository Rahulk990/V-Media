import React from 'react'
import './Comments.css'

import {IconButton } from "@material-ui/core";
import {Send } from '@material-ui/icons';
const comment_dialog = ()=>{
    return(
        <div className='comment__body'>
            
            <form>
            <div className='comment__input'>
                <input placeholder='Enter your comment'/>
                <IconButton>
                    <Send/>
                </IconButton>
            </div>
            </form>
            
        </div>
    )
}

export default comment_dialog