import React from 'react'
import './Profile.css'
const Profile = () =>{
    return (

        <div className='profile'>
            <div className='wrapper'>
                <div className='profile__card'>
                    <div className='profile__card__img'>
                        <img src="https://www.biography.com/.image/ar_1:1%2Cc_fill%2Ccs_srgb%2Cg_face%2Cq_auto:good%2Cw_300/MTM2OTI2NTY2Mjg5NTE2MTI5/justin_bieber_2015_photo_courtesy_dfree_shutterstock_348418241_croppedjpg.jpg"/>
                    </div>
                    <div className='profile__card__info'>
                        <div className='profile__card__info__name'>
                            Justin Beiber
                        </div>
                        <div className='profile__card__info__des'>
                            Celebrity
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile;