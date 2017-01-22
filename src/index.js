import 'babel-polyfill'
import React from 'react'
import ReactDOM from "react-dom"
import {Provider} from 'react-redux'
import {createStore, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import promise from 'redux-promise'
import createLogger from 'redux-logger'
import allReducers from './reducers'
import App from './components/App'
import axios from 'axios'
import { addInitialAlbumsData } from './actions/index'

const logger = createLogger()
const store = createStore(
    allReducers,
    applyMiddleware(thunk, promise, logger)
)

// load initial data and store it
axios.get('https://rest0832970.herokuapp.com/api/products')
    .then(response => {
        store.dispatch(addInitialAlbumsData(response.data.items))
    })
    .catch(error => {
        console.warn('Unable to GET from api.', error)
    })

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
)