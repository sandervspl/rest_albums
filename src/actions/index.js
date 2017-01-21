export const selectAlbum = (album) => {
    return {
        type: 'ALBUM_SELECTED',
        payload: album
    }
}