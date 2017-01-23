// dependencies
import React from 'react'

// components
import NavItem from '../../containers/Nav/NavItem'

// style
import './style.styl'

const Nav = () => (
    <nav>
        <ul>
            <NavItem text="New Album" view="NEW_ALBUM_VIEW" />
        </ul>
    </nav>
)

export default Nav