import axios from 'axios'
import $ from 'jquery'
import { HOST_URL } from '../vars/server'

export const selectAlbum = (album) => {
    return {
        type: 'ALBUM_SELECTED',
        payload: album
    }
}

// export const addAlbumsData = (albums) => {
//     return {
//         type: 'ADD_ALBUMS_DATA',
//         payload: albums
//     }
// }

export const selectView = (view) => {
    return {
        type: 'VIEW_SELECTED',
        payload: view
    }
}

export const REQUEST_ALBUMS = 'REQUEST_ALBUMS'
function requestAlbums() {
    return {
        type: REQUEST_ALBUMS
    }
}

export const RECEIVE_ALBUMS = 'RECEIVE_ALBUMS'
function receiveAlbums(albums) {
    return {
        type: RECEIVE_ALBUMS,
        albums
    }
}

export function fetchAlbums()
{
    return function(dispatch) {
        // start load spinner
        dispatch(requestAlbums())

        // fetch albums from server
        return axios.get(`${HOST_URL}/api/products`, {
            headers: { 'accept': 'application/json' }
        })
            // send response data to store
            .then(response => dispatch(receiveAlbums(response.data.items)))

            // display error in console
            .catch(error => console.warn('Unable to fetch albums', error))
    }
}

export function deleteAlbum(albumId)
{
    return function(dispatch) {
        return axios.delete(`${HOST_URL}/api/products/${albumId}`)

                // refresh album list
                .then(() => dispatch(fetchAlbums()))

                // display error in console
                .catch(error => console.warn(`Unable to delete album ${albumId}`, error))
    }
}

export function addAlbum(album)
{
    return function (dispatch) {
        return $.ajax({
            url     : `${HOST_URL}/api/products/`,
            type    : 'POST',
            data    : album,
            success : () => {
                dispatch(fetchAlbums())
                dispatch(selectView('ALBUMS_VIEW'))
            },
            fail    : (a,b,c) => console.warn('unable to post to server', a, b, c)
        })
    }
}