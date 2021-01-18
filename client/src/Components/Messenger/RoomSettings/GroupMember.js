import React, { useEffect, useState } from "react"


import './GroupMember.css'

const GroupMember = ({userArray}) =>{
    console.log(userArray);
    return (
        <div className='groupmember__dialog'>
             <div className='groupmember__list'>
                    Member 1
             </div>
             <div className='groupmember__list'>
                    Member 1
             </div>
             <div className='groupmember__list'>
                    Member 1
             </div>
             <div className='groupmember__list'>
                    Member 1
             </div>
        </div>
    )
}

export default GroupMember;