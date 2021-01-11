import react from 'react'
import './Groupinfo.css'
const Groupinfo = () =>{
    return (
        <div className="inbox__groupinfo">
            <div className='inbox__groupinfo__selectListOption'>
                <p>Group Info</p>
            </div>
            <div className='inbox__groupinfo__selectListOption'>
                <p>Clear chat</p>
            </div>
            <div className='inbox__groupinfo__selectListOption'>
                <p>Exit group</p>
            </div>

        </div>
    )
}

export default Groupinfo;