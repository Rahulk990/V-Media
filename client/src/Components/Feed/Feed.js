import React, { useEffect, useState } from 'react'
import './Feed.css'

import axios from '../Misc/axios'
import PostSender from './PostSender'
import Post from './Post'
import Pusher from 'pusher-js'

const Feed = ({ isAdmin }) => {
    const [postsData, setPostsData] = useState([])

    const syncFeed = () => {
        axios.get('retrieve/posts')
            .then((res) => {
                console.log(res.data);
                setPostsData(res.data);
            })
    }

    useEffect(() => {
        const channel = pusher.subscribe('posts');
        channel.bind('inserted', function (data) {
            syncFeed()
        });
    })

    useEffect(() => {
        syncFeed();
    }, [])

    const pusher = new Pusher('9cb709a278c38e8892bd', {
        cluster: 'ap2'
    });



    return (
        <div className='feed'>
            {isAdmin && <PostSender />}

            {
                postsData.map(entry => (
                    <Post
                        profilePic={entry.avatar}
                        text={entry.text}
                        timestamp={entry.timestamp}
                        imgName={entry.imgName}
                        username={entry.user}
                    />
                ))
            }


        </div>
    )
}

export default Feed
