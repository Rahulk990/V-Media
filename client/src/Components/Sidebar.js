import React from 'react'
import './Sidebar.css'

import SidebarRow from './SidebarRow'
import FlagIcon from '@material-ui/icons/Flag'
import PeopleIcon from '@material-ui/icons/People'

const Sidebar = () => {
    return (
        <div className='sidebar'>
            <SidebarRow src="S" title='Name'/>
            <SidebarRow Icon={FlagIcon} title='Pages'/>
            <SidebarRow Icon={PeopleIcon} title='People'/>
        </div>
    )
}

export default Sidebar
