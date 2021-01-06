import React from 'react'
import './Feed.css'

import PostSender from './PostSender'
import Post from './Post'

const Feed = () => {
    return (
        <div className='feed'>
            <PostSender />

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
                image='https://i.ytimg.com/vi/FIrgsfsvzlI/hqdefault.jpg'
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
