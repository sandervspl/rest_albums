import {combineReducers} from 'redux'
import AlbumReducer from './ReducerAlbums'
import ActiveAlbumReducer from './ReducerActiveAlbum'
import ViewReducer from './ReducerView'

/*
 * We combine all reducers into a single object before updated data is dispatched (sent) to store
 * Your entire applications state (store) is just whatever gets returned from all your reducers
 * */

const allReducers = combineReducers({
    albums: AlbumReducer,
    activeAlbum: ActiveAlbumReducer,
    activeView: ViewReducer
})

export default allReducers