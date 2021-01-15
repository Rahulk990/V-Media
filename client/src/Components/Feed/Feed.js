import React, { useEffect, useState } from 'react'
import './Feed.css'

import axios from '../Misc/axios'
import PostSender from './PostSender'
import Post from './Post'
import socketIOClient from 'socket.io-client'

const Feed = ({ isAdmin }) => {
    const [postsData, setPostsData] = useState([])

    const syncFeed = () => {
        axios.get('retrieve/posts')
            .then((res) => {
                // console.log(res.data);
                setPostsData(res.data);
            })
    }

    useEffect(() => {
        syncFeed();

        const socket = socketIOClient('http://localhost:8000')
        socket.on('refresh', data => {
            // console.log(data)
            syncFeed()
        })

        return () => socket.disconnect();
    }, [])

    return (
        <div className='feed'>
            {isAdmin && <PostSender />}

            {
                postsData.map(entry => (
                    <Post
                        userId={entry.userId}
                        username={entry.username}
                        avatar={entry.avatar}
                        text={entry.text}
                        imgName={entry.imgName}
                        timestamp={entry.timestamp}
                        likes={entry.likes}
                    />
                ))
            }


        </div>
    )
}

export default Feed
