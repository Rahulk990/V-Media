import React, { useEffect, useState } from 'react'

import axios from '../Misc/axios'
import Post from '../Feed/Post'

const PostMiddleware = ({ postId }) => {

    const [post, setPost] = useState(null)
    useEffect(() => {
        axios.get('retrieve/postData', { params: { postId: postId } })
            .then(res => setPost(res.data))
    }, [])

    return (
        <>
            {post && post.likesArray && <Post post={post} />}
        </>
    )
}

export default PostMiddleware
