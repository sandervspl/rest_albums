// dependencies
import React from 'react'

// components
import Albums from '../containers/Albums/Albums'
import Nav from './Nav/Nav'
import NewAlbum from '../containers/NewAlbum/NewAlbum'

// style
import '../style/style.styl'

const App = () => (
    <div className="wrapper">
        <Nav />
        <Albums />
        <NewAlbum />
    </div>
)

export default App