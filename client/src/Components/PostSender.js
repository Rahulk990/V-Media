import React from 'react'
import './PostSender.css'

import { Avatar } from '@material-ui/core'

const PostSender = () => {
    return (
        <div classname='postSender'>
            <div className='postSender__top'>
                <Avatar />

                <form>
                    <input type='text' placeholder="What's on your mind."/>
                    <input type='text' placeholder='Post Button'/>
                </form>

            </div>

            <div className='postSender__bottom'>

            </div>
        </div>
    )
}

export default PostSender
