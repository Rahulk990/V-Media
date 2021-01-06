import React from 'react'
import './Rightbar.css'
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import Event from './Events'

const Rightbar = () => {

    function dropmenu()
    {
        console.log("clicked");
        document.getElementById("drop_content").classList.add("onclick");
        return;
    }
    
    return (
        <div className='rightbar'>
            <nav>
                <div className = "drop__btn" onClick={dropmenu}>
                Events <span><ArrowDropDownIcon/></span>
                </div>
                <div  className = "wrapper">
                    <ul id = "drop_content" className = "menubar">
                        <li> <a href = "#">Event-1</a> </li>
                        <li> <a href = "#">Event-2</a> </li>
                        <li> <a href = "#">Event-3</a> </li>
                    </ul>
                </div>

            </nav>
            <div className="scroll_div">
                <Event />   
                <Event />            
            </div>
        </div>
    )
}

export default Rightbar
