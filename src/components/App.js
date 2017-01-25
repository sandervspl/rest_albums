// dependencies
import React from 'react'

// components
import Albums from '../containers/Albums/Albums'
import EditAlbum from '../containers/EditAlbum/EditAlbum'
import Nav from './Nav/Nav'
import NewAlbum from '../containers/NewAlbum/NewAlbum'

// style
import '../style/style.styl'

const App = () => (
    <div className="wrapper">
        <Nav />
        <Albums />
        <NewAlbum />
        <EditAlbum />
    </div>
)

export default App