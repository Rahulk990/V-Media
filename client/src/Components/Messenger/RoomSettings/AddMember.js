import react from 'react'
import './AddMember.css'
import {IconButton, Tooltip } from "@material-ui/core";
import { AddRounded, ExitToAppRounded, PermIdentityRounded} from '@material-ui/icons';


const AddMember = () => {
    return (
        <div className = 'add__dialog'>
            <div className ='add__dialog__inputbox'>
                <IconButton>
                    <AddRounded/>
                </IconButton>
                <input placeholder='Add member Email'/>
            </div>
        </div>
    )
}

export default AddMember;