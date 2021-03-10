import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import './Comments.css'

import { Avatar, IconButton, Tooltip } from '@material-ui/core'
import { Delete } from '@material-ui/icons'
import removeComment from '../API/removeComment'
import { selectUser } from '../ReduxStore/appSlice'

const Comments = ({ postId, comment }) => {

    const dispatch = useDispatch()
    const user = useSelector(selectUser)
    const handleDelete = async () => {
        await removeComment(dispatch, postId, comment._id)
    }

    return (
        <div className='comment'>
            <div className='comment__info'>
                <Avatar
                    style={{ width: '30px', height: '30px' }}
                    src={comment.avatar}
                />

                <Tooltip title={new Date(parseInt(comment.timestamp)).toLocaleString()} enterDelay={1000} >

                    <div className='comment__body'>
                        <div className='comment__bodyUsername'>
                            <p>{comment.username}</p>
                        </div>
                        <div className='comment__bodyContent'>
                            <p>{comment.content}</p>
                        </div>
                    </div>

                </Tooltip>
            </div>

            { (user.userId === comment.userId) &&
                <IconButton style={{ width: 'fit-content', height: 'fit-content' }} onClick={handleDelete}>
                    <Delete style={{ color: '#FF0000' }} />
                </IconButton>
            }

        </div>
    )
}

export default Comments
