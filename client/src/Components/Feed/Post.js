import React from 'react'
import './Post.css'

import { Avatar } from '@material-ui/core'
import { ChatBubbleOutline, NearMe, ThumbUp } from '@material-ui/icons'
import {useSelector } from 'react-redux'
import Comment from './Comments'
import { selectUser } from '../ReduxStore/appSlice'

const Post = ({ userId, username, avatar, text, image, timestamp, likes}) => {
    const user = useSelector(selectUser)
    
    
    const handlelike = () =>{
        document.getElementsByClassName('post__option__like')[0].classList.toggle('active__like')
    }

    // for(let i = 0; i<likes.length; i++)
    // {
    //     if(likes[i] === user.userId)
    //     {
    //         handlelike();
    //     }
    // }
    return (
        <div className='post'>
            <div className='post__top'>
                <Avatar
                    className='post__avatar'
                    src={avatar}
                />

                <div className='post__topInfo'>
                    <h3>{username}</h3>
                    <p> {new Date(parseInt(timestamp)).toLocaleString()} </p>
                </div>
            </div>

            <div className='post__text'>
                <p>{text}</p>
            </div>

            <div className='post__image'>
                {image && <img
                    src={image}
                    alt=''
                />}
            </div>

            <div className='post__bottom'>

                <div className='post__option post__option__like' onClick={handlelike}>
                    <ThumbUp />
                    <p>Like {likes.length}</p>
                </div>

                <div className='post__option' onClick='handlecomment'>
                    <ChatBubbleOutline />
                    <p>Comment</p>
                </div>

                <div className='post__option'>
                    <NearMe />
                    <p>Share</p>
                </div>
                {/* <Comment/> */}
            </div>
        </div>
    )
}

export default Post
