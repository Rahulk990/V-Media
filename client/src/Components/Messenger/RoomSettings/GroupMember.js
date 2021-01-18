import React, { useEffect, useState } from "react"


import './GroupMember.css'

const GroupMember = ({userArray}) =>{
    // console.log(userArray);
    return (
        <div className='groupmember__dialog'>
        {userArray.map( (userId) => {
            return(
                <div className='groupmember__list'>
                    {userId}
                </div>
            )
        })   }
        </div>
    )
}

export default GroupMember;