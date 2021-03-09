import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'

import axios from '../Misc/axios'
import { getPosts } from '../ReduxStore/postSlice'
import Post from '../Feed/Post'

import './Profile.css'
const Profile = () => {

    const location = useLocation()
    const [user, setUser] = useState(null)
    const postData = useSelector(getPosts)

    useEffect(() => {
        const userId = (location.pathname).split('/')[2]
        axios.get('retrieve/user', { params: { userId: userId } })
            .then((res) => setUser(res.data))
    }, [location])

    return (

        <div className='profile'>
            <div className='wrapper'>

                <div className='profile__card'>

                    <div className='profile__card__img'>
                        <img src={user && user.avatar} alt="" />
                    </div>

                    <div className='profile__card__info'>

                        <div className='profile__card__info__name'>
                            {user && user.name}
                        </div>

                        <div className='profile__card__info__des'>
                            {user && user.email}
                        </div>

                    </div>

                    <div className='profile__feed'>
                        <h3> Posts </h3>
                        <div className='profile__feedPosts'>

                            {user && postData.map(post => (
                                (post.userId == user.userId) && (
                                    <Post
                                        key={post._id}
                                        post={post}
                                    />
                                )
                            ))
                            }

                        </div>
                    </div>



                </div>

            </div>
        </div>
    )
}

export default Profile;