import React from 'react'
import './PostSender.css'

import { Avatar } from '@material-ui/core'
import { InsertEmoticon, PhotoLibrary, Videocam } from '@material-ui/icons'

const PostSender = () => {

    const handleSubmit = (e) => {
        e.preventDefault();
    }

    return (
        <div className='postSender'>
            <div className='postSender__top'>
                <Avatar />

                <form>
                    <input className='postSender__input' placeholder="What's on your mind?" />
                    <button onClick={handleSubmit} type='submit'>
                        Submit
                    </button>
                </form>
            </div>

            <div className='postSender__bottom'>
                <div className='postSender__option'>
                    <Videocam style={{ color: "red" }} />
                    <h3> Live Video </h3>
                </div>
                <div className='postSender__option'>
                    <PhotoLibrary style={{ color: "green" }} />
                    <h3> Photos/Videos </h3>
                </div>
                <div className='postSender__option'>
                    <InsertEmoticon style={{ color: "yellow" }} />
                    <h3> Feelings/Activity </h3>
                </div>
            </div>
        </div>
    )
}

export default PostSender
