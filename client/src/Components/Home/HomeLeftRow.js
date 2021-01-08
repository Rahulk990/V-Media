import React from 'react'
import './HomeLeftRow.css'

import { Avatar } from '@material-ui/core'

const HomeLeftRow = ({ src, Icon, title }) => {
    return (
        <div className='homeLeftRow'>
            
            {src && <Avatar
                className="homeLeftRow__avatar"
                style={{ "height": "25px", "width": "25px" }}
                src={src}
            />}

            {Icon && <Icon />}
            <p>{title}</p>
        </div>
    )
}

export default HomeLeftRow
