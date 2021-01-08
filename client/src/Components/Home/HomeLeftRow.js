import React from 'react'
import './HomeLeftRow.css'

import { Avatar } from '@material-ui/core'

const HomeLeftRow = ({ src, Icon, title }) => {
    return (
        <div className='homeLeftRow'>
            
            {src && <Avatar
                style={{ "height": "25px", "width": "25px", 'margin': "10px 10px"}}
                src={src}
            />}

            {Icon && <Icon />}
            <p>{title}</p>
        </div>
    )
}

export default HomeLeftRow
