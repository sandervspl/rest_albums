export const selectAlbum = (album) => {
    return {
        type: 'ALBUM_SELECTED',
        payload: album
    }
}

export const addAlbumsData = (data) => {
    return {
        type: 'ADD_ALBUMS_DATA',
        payload: data
    }
}

export const selectView = (view) => {
    return {
        type: 'VIEW_SELECTED',
        payload: view
    }
}