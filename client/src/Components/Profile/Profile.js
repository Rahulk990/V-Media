import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

import axios from '../Misc/axios'
import PostMiddleware from './PostMiddleware'

import './Profile.css'
const Profile = () => {

    const location = useLocation()
    const [user, setUser] = useState(null)

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

                            {user && user.postsArray.map(postId => (
                                <PostMiddleware
                                    key={postId._id}
                                    postId={postId}
                                />
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