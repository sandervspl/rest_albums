// dependencies
import React from 'react'
import AlbumList from '../../containers/AlbumList'

// style
import './style.styl'

const Albums = () => (
    <div id="albums-wrapper">
        <h1 className="title-big">Albums</h1>
        <AlbumList />
    </div>
)

export default Albums