// dependencies
import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import qs from 'qs'

// components
import Pagination from '../../containers/Pagination/Pagination'

// actions
import { addAlbumsData, selectAlbum, fetchAlbums, deleteAlbum } from '../../actions/index'

// style
import './style.styl'


class AlbumList extends Component
{
    constructor(props)
    {
        super(props)
        this.state = {
            pageCount: 0,
            start: null,
            limit: null
        }
    }

    componentDidMount = () =>
    {
        let fullUrl = this.getFullUrl()
        let urlParams = this.getParamsFromUrl(fullUrl)

        if (urlParams === null || urlParams === '')
            console.log('no URL parameters')

        // create pagination urls
        let params = qs.parse(urlParams)

        // fetch album list from server
        this.props.fetchAlbums()
    }

    getFullUrl = () => window.location.search

    getParamsFromUrl = (url) => url.slice(url.indexOf('?') + 1, url.length)

    deleteAlbum = (e) => this.props.deleteAlbum(e.target.dataset.id)

    renderAlbumList = () =>
    {
        return this.props.albums.map((album, index) => {
            const c = 'list-item item-' + index
            return (
                <li key={album.id} className={c}>
                    <span className="btn-sm" data-id={album.id} onClick={this.deleteAlbum}>delete</span>
                    <span onClick={() => this.props.selectAlbum(album)}>{album.artist} - {album.title}</span>
                </li>
            )
        })
    }

    render()
    {
        const loader = this.props.isFetching ? 'loading' : 'loading loaded'

        return (
            <div className="column--50">
                <h1 className="title-big">Albums</h1>
                <div className="album-list-inner">
                    <div className={loader}></div>
                    <ul className="list-spaced">
                        {this.renderAlbumList()}
                    </ul>
                </div>
                <Pagination/>
            </div>
        )
    }
}

// Get apps state and pass it as props
function mapStateToProps(state) {
    return {
        albums: state.albums.items,
        isFetching: state.albums.isFetching
    }
}

// Get actions and pass them as props
function matchDispatchToProps(dispatch) {
    return bindActionCreators({
        addAlbumsData,
        selectAlbum,
        fetchAlbums,
        deleteAlbum
    }, dispatch)
}

// We don't want to return the plain component anymore, we want to return the smart Container
export default connect(mapStateToProps, matchDispatchToProps)(AlbumList)