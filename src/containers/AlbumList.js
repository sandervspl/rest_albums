// dependencies
import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

// actions
import { selectAlbum } from '../actions/index'


class AlbumList extends Component
{
    constructor(props)
    {
        super(props)
    }

    renderAlbumList()
    {
        return this.props.albums.map((album, index) => {
            let c = 'list-item item-' + index
            return (
                <li
                    key={album.id}
                    className={c}
                >
                    {album.name}
                </li>
            )
        })
    }

    render()
    {
        return (
            <ul className="list-spaced">
                {this.renderAlbumList()}
            </ul>
        )
    }
}

// Get apps state and pass it as props
function mapStateToProps(state) {
    return {
        albums: state.albums
    }
}

// Get actions and pass them as props
function matchDispatchToProps(dispatch){
    return bindActionCreators({}, dispatch)
}

// We don't want to return the plain component anymore, we want to return the smart Container
export default connect(mapStateToProps, matchDispatchToProps)(AlbumList)