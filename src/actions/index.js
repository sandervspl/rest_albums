export const selectAlbum = (album) => {
    return {
        type: 'ALBUM_SELECTED',
        payload: album
    }
}

export const addInitialAlbumsData = (data) => {
    return {
        type: 'ADD_INITIAL_ALBUMS_DATA',
        payload: data
    }
}

export const selectView = (view) => {
    return {
        type: 'VIEW_SELECTED',
        payload: view
    }
}