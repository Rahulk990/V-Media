import React from 'react'
import './Sidebar.css'

import SidebarRow from './SidebarRow'

const Sidebar = () => {
    return (
        <div className='sidebar'>
            <div className='sidebar__heading'>
                <p> Your Teams </p>
            </div>

            <SidebarRow src="S" title='Team1' />
            <SidebarRow src="S" title='Team1' />
            <SidebarRow src="S" title='Team1' />
            <SidebarRow src="S" title='Team1' />
            <SidebarRow src="S" title='Team1' />
            <SidebarRow src="S" title='Team1' />
        </div >
    )
}

export default Sidebar
