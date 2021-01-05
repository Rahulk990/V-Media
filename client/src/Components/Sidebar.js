import React from 'react'
import './Sidebar.css'

import SidebarRow from './SidebarRow'
import EmojiFlagsIcon from '@material-ui/icons/EmojiFlags'
import PeopleIcon from '@material-ui/icons/People'

const Sidebar = () => {
    return (
        <div className='sidebar'>
            <SidebarRow src="S" title='Name'/>
            <SidebarRow Icon={EmojiFlagsIcon} title='Pages'/>
            <SidebarRow Icon={PeopleIcon} title='People'/>
        </div>
    )
}

export default Sidebar
