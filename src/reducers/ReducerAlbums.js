/*
 * All reducers get two parameters passed in, state and action that occurred
 *       > state isn't entire apps state, only the part of state that this reducer is responsible for
 * */

// "state = []" is set so that we don't throw an error when app first boots up

import { REQUEST_ALBUMS, RECEIVE_ALBUMS } from '../actions'

export default function (state = {
    isFetching: false,
    items: []
}, action) {
    switch (action.type)
    {
        case REQUEST_ALBUMS:
            return Object.assign({}, state, {
                isFetching: true
            })

        case RECEIVE_ALBUMS:
            return Object.assign({}, state, {
                isFetching: false,
                items: action.albums
            })

        default:
            return state
    }
}