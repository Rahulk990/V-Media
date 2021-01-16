import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import './Post.css'

import Comment from './Comments'
import { Avatar, IconButton } from '@material-ui/core'
import { ChatBubbleOutline, Delete, NearMe, ThumbUp } from '@material-ui/icons'
import deletePost from '../API/deletePost'
import { selectUser } from '../ReduxStore/appSlice'

const Post = ({ post }) => {

    const dispatch = useDispatch()
    const user = useSelector(selectUser)

    const handleDelete = async () => {
        await deletePost(dispatch, user.userId, post._id)
    }

    const handlelike = () => {
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

                <div className='post__topLeft'>
                    <Avatar
                        className='post__avatar'
                        src={post.avatar}
                    />

                    <div className='post__topInfo'>
                        <h3>{post.username}</h3>
                        <p> {new Date(parseInt(post.timestamp)).toLocaleString()} </p>
                    </div>
                </div>

                {post.userId === user.userId &&
                    <IconButton onClick={handleDelete}>
                        <Delete />
                    </IconButton>
                }

            </div>

            <div className='post__text'>
                <p>{post.text}</p>
            </div>

            <div className='post__image'>
                {post.image && <img
                    src={post.image}
                    alt=''
                />}
            </div>

            <div className='post__bottom'>

                <div className='post__option post__option__like' onClick={handlelike}>
                    <ThumbUp />
                    <p>Like {post.likes && post.likes.length}</p>
                </div>

                <div className='post__option'>
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
