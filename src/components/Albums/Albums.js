import React from 'react'
import AlbumList from '../../containers/AlbumList'
import AlbumDetails from '../../containers/AlbumDetails'

const Albums = () => (
    <div>
        <h2>Album List</h2>
        <AlbumList />
        <hr/>
        <h2>Album Details</h2>
        <AlbumDetails />
    </div>
)

export default Albums