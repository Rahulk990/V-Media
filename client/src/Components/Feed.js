import React from 'react'
import './Feed.css'

import PostSender from './PostSender'
// import Post from './Post'

const Feed = () => {
    return (
        <div className='feed'>
            <PostSender />    
            
            {/* Posts */}
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
