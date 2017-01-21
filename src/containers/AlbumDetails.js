// dependencies
import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'


class AlbumDetails extends Component
{
    constructor(props)
    {
        super(props)
    }

    render()
    {
        const { album } = this.props

        if ( ! album) {
            return (<div>Select an album...</div>)
        }
        return (
            <div>
                <img src={album.thumbnail} />
                <h2> {album.title} </h2>
                <h3>Tracks: {album.tracksNum}</h3>
            </div>
        )
    }
}

// Get apps state and pass it as props
function mapStateToProps(state) {
    return {
        album: state.activeAlbum
    }
}

// Get actions and pass them as props
function matchDispatchToProps(dispatch) {
    return bindActionCreators({}, dispatch)
}

// We don't want to return the plain component anymore, we want to return the smart Container
export default connect(mapStateToProps, matchDispatchToProps)(AlbumDetails)
