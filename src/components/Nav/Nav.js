// dependencies
import React from 'react'

// components
import NavItem from '../../containers/Nav/NavItem'

// style
import './style.styl'

const Nav = () => (
    <nav>
        <ul>
            <NavItem text="text1" />
            <NavItem text="text2" />
            <NavItem text="text3" />
        </ul>
    </nav>
)

export default Nav