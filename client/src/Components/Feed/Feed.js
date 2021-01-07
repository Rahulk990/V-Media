import React from 'react'
import './Feed.css'

import PostSender from './PostSender'
import Post from './Post'

const Feed = ({ isAdmin }) => {
    return (
        <div className='feed'>
            {isAdmin && <PostSender />}

            <Post
                profilePic='{entry.avatar}'
                username='Rahul'
                timestamp='Timestamp'
                text='Message is to be displayed here'
            />

            <Post
                profilePic='{entry.avatar}'
                username='Rahul'
                timestamp='Timestamp'
                text='Message is to be displayed here'
            />

            <Post
                profilePic='{entry.avatar}'
                username='Rahul'
                timestamp='Timestamp'
                text='Message is to be displayed here'
            />

            <Post
                profilePic='{entry.avatar}'
                username='Rahul'
                timestamp='Timestamp'
                text='Message is to be displayed here'
            />

            <Post
                profilePic='{entry.avatar}'
                username='Rahul'
                timestamp='Timestamp'
                text='Message is to be displayed here'
            />

            <Post
                profilePic='{entry.avatar}'
                username='Rahul'
                timestamp='Timestamp'
                text='Message is to be displayed here'
            />

            {/* {
                postData.map(entry => (
                    <Post 
                        profilePic={entry.avatar}
                        text={entry.text}
                        timestamp={entry.timestamp}
                        imgName={entry.imgName}
                        username={entry.user}
                    />
                ))
            } */}


        </div>
    )
}

export default Feed
