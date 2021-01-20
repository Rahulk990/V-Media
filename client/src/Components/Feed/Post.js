import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import './Post.css'

import Comment from './Comments'
import CommentSender from './CommentSender'
import { Avatar, IconButton } from '@material-ui/core'
import { ChatBubbleOutline, Delete, Sync, ThumbUp } from '@material-ui/icons'
import { selectUser } from '../ReduxStore/appSlice'

import deletePost from '../API/deletePost'
import removeLike from '../API/removeLike'
import addLike from '../API/addLike'
import fetchPostData from '../API/fetchPostData'
import { storage } from '../../firebase'

const Post = ({ post }) => {

    const history = useHistory()
    const dispatch = useDispatch()
    const user = useSelector(selectUser)
    const [showComments, setShowComments] = useState(false)

    const handleDelete = async () => {
        storage.refFromURL(post.imgName).delete()
        await deletePost(dispatch, user.userId, post._id)
    }

    const handleRefresh = async () => {
        await fetchPostData(dispatch, post._id)
    }

    const handleLike = async () => {
        if (post.likesArray.includes(user.userId)) {
            await removeLike(dispatch, user.userId, post._id)
        } else {
            await addLike(dispatch, user.userId, post._id)
        }
    }

    return (
        <div className='post'>
            <div className='post__top'>

                <div className='post__topLeft'>
                    <Avatar
                        className='post__avatar'
                        src={post.avatar}
                        onClick={() => history.replace('/user/' + user.userId)}
                    />

                    <div className='post__topInfo'>
                        <h3 onClick={() => history.replace('/user/' + user.userId)}>{post.username}</h3>
                        <p> {new Date(parseInt(post.timestamp)).toLocaleString()} </p>
                    </div>
                </div>

                <div className='post__topIcons'>

                    {post.userId === user.userId &&
                        <IconButton
                            className='post__topIconsDelete'
                            onClick={handleDelete}
                        >
                            <Delete />
                        </IconButton>
                    }

                    <IconButton
                        className='post__topIconsRefresh'
                        onClick={handleRefresh}
                    >
                        <Sync />
                    </IconButton>

                </div>

            </div>

            <div className='post__text'>
                <p>{post.text}</p>
            </div>

            <div className='post__image'>
                {post.imgName && <img
                    src={post.imgName}
                    alt=''
                />}
            </div>

            <div className={`post__bottom ${showComments && 'post__bottom--active'}`}>

                <div
                    className={`post__option ${post.likesArray.includes(user.userId) && 'post__option--active'}`}
                    onClick={handleLike}
                >
                    <ThumbUp />
                    <p>Like</p>
                    <p>{post.likesArray.length}</p>
                </div>

                <div className={`post__option ${showComments && 'post__option--active'}`}
                    onClick={() => setShowComments(!showComments)}
                >
                    <ChatBubbleOutline />
                    <p>Comment</p>
                    <p>{post.commentsArray.length}</p>
                </div>

            </div>

            {showComments &&
                <div className='post__comments'>

                    {
                        post.commentsArray.map(comment => (
                            <Comment
                                key={comment._id}
                                postId={post._id}
                                comment={comment}
                            />
                        ))
                    }

                    <CommentSender
                        postId={post._id}
                    />

                </div>
            }

        </div>
    )
}

export default Post
