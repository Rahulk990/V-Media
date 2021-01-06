import React from 'react'
import './SidebarRow.css'

import { Avatar } from '@material-ui/core'

const SidebarRow = ({src, Icon, title}) => {
    return (
        <div className='sidebarRow'>
            {src && <Avatar className="avatar" style={{"height":"25px", "width":"25px"}} src={src} />}
            {Icon && <Icon />}
            <p>{title}</p>
        </div>
    )
}

export default SidebarRow
