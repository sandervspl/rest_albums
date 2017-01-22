// dependencies
import React from 'react'

// components
import Albums from './Albums/Albums'
import Nav from './Nav/Nav'

// style
import '../style/style.styl'

const App = () => (
    <div id="wrapper">
        <Nav />
        <Albums />
    </div>
)

export default App