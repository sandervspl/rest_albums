export const selectAlbum = (album) => {
    return {
        type: 'ALBUM_SELECTED',
        payload: album
    }
}

export const addAlbumsData = (albums) => {
    return {
        type: 'ADD_ALBUMS_DATA',
        payload: albums
    }
}

export const selectView = (view) => {
    return {
        type: 'VIEW_SELECTED',
        payload: view
    }
}