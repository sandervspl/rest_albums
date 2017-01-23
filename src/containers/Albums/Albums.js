// dependencies
import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

// components
import AlbumList from '../AlbumList/AlbumList'
import AlbumDetails from '../AlbumDetails/AlbumDetails'

// style
import './style.styl'


class Albums extends Component
{
    constructor(props)
    {
        super(props)
    }

    render()
    {
        const { activeView } = this.props
        let wrapperClass = 'albums-wrapper'

        if (activeView === 'ALBUMS_VIEW')
            wrapperClass = 'albums-wrapper active'

        return (
            <div className={wrapperClass}>
                <AlbumList />
                <AlbumDetails />
            </div>
        )
    }
}

// Get apps state and pass it as props
function mapStateToProps(state) {
    return {
        activeView: state.activeView
    }
}

// Get actions and pass them as props
function matchDispatchToProps(dispatch){
    return bindActionCreators({}, dispatch)
}

// We don't want to return the plain component anymore, we want to return the smart Container
export default connect(mapStateToProps, matchDispatchToProps)(Albums)