import React, { useState } from 'react'
import './PostSender.css'

import { Avatar, Button } from '@material-ui/core'
import { InsertEmoticon, PhotoLibrary, Videocam } from '@material-ui/icons'
import axios from '../Misc/axios'
import { useSelector } from 'react-redux'
import { selectUser } from '../ReduxStore/appSlice'

const PostSender = () => {

    const [postInput, setPostInput] = useState('');
    const user = useSelector(selectUser)

    const handleSubmit = async (e) => {
        e.preventDefault();

        // if (image) { 1:32 snap
        // }

        const postData = {
            userid: user.userId,
            text: postInput,
            username: user.username,
            avatar: user.avatarSrc,
            timestamp: Date.now(),
            likes:[""],
            comments:[{}]
        }
        savePost(postData)
        setPostInput('');
    }

    const savePost = async (postData) => {
        await axios.post('/upload/post', postData)
            .then((res) => {
                // console.log(res)
            })
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
