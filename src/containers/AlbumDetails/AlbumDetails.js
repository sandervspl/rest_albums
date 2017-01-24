// dependencies
import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

// style
import './style.styl'


class AlbumDetails extends Component
{
    constructor(props)
    {
        super(props)
    }

    render()
    {
        if (this.props.activeAlbum === null) {
            return (
                <div className="column--50">
                    <h1 className="title-big">Album</h1>
                    <div className="relative">
                        <p>Select an album...</p>
                    </div>
                </div>
            )
        } else {
            const {activeAlbum} = this.props
            return (
                <div className="column--50">
                    <h1 className="title-big">Album</h1>
                    <div className="relative">
                        <ul>
                            <li> <span className="album-tag">title</span> {activeAlbum.title} </li>
                            <li> <span className="album-tag">artist</span> {activeAlbum.artist} </li>
                            <li> <span className="album-tag">year</span> {activeAlbum.year} </li>
                            <li> <span className="album-tag">genre</span> {activeAlbum.genre} </li>
                            <li> <span className="album-tag">tracks</span> {activeAlbum.tracks} </li>
                        </ul>
                    </div>
                </div>
            )
        }
    }
}

// Get apps state and pass it as props
function mapStateToProps(state) {
    return {
        activeAlbum: state.activeAlbum
    }
}

// Get actions and pass them as props
function matchDispatchToProps(dispatch) {
    return bindActionCreators({}, dispatch)
}

// We don't want to return the plain component anymore, we want to return the smart Container
export default connect(mapStateToProps, matchDispatchToProps)(AlbumDetails)