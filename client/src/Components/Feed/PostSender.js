import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import './PostSender.css'

import { Avatar, Button } from '@material-ui/core'
import { InsertEmoticon, PhotoLibrary, Videocam } from '@material-ui/icons'
import { selectUser } from '../ReduxStore/appSlice'
import uploadPost from '../API/uploadPost'

const PostSender = () => {

    const dispatch = useDispatch()
    const user = useSelector(selectUser)
    const [postInput, setPostInput] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault();

        // if (image) { 1:32 snap }

        if (postInput.length > 0) {
            const postData = {
                userId: user.userId,
                username: user.username,
                text: postInput,
                avatar: user.avatarSrc,
                timestamp: Date.now()
            }

            setPostInput('');
            await uploadPost(dispatch, postData)
        }
    }

    return (
        <div className='postSender'>
            <div className='postSender__top'>
                <Avatar src={user.avatarSrc} />

                <form>

                    <input
                        value={postInput}
                        onChange={(e) => setPostInput(e.target.value)}
                        className='postSender__input'
                        placeholder="What's on your mind?"
                    />

                    <Button onClick={handleSubmit} type='submit'>
                        Submit
                    </Button>

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
                    <InsertEmoticon style={{ color: "orange" }} />
                    <h3> Feelings/Activity </h3>
                </div>

            </div>
        </div>
    )
}

export default PostSender
