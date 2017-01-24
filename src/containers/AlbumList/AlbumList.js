// dependencies
import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import axios from 'axios'

// actions
import { addAlbumsData, selectAlbum } from '../../actions/index'

// style
import './style.styl'


class AlbumList extends Component
{
    constructor(props)
    {
        super(props)
        this.state = {
            loading: true
        }
    }

    componentWillMount()
    {
        this.setState({ loading: true }, () => {
            // load initial data and store it
            axios.get('https://rest0832970.herokuapp.com/api/products')
            // axios.get('http://localhost:3000/api/products')
                .then(response => {
                    this.setState({ loading: false }, () => {
                        this.props.addAlbumsData(response.data.items)
                    })
                })
                .catch(error => {
                    this.setState({ loading: false }, console.warn('Unable to GET from api.', error))
                })
        })
    }

    renderAlbumList()
    {
        return this.props.albums.map((album, index) => {
            const c = 'list-item item-' + index
            return (
                <li
                    key={album.id}
                    className={c}
                    onClick={() => this.props.selectAlbum(album)}
                >
                    {album.title}
                </li>
            )
        })
    }

    render()
    {
        const loader = this.state.loading ? 'loading' : 'loading loaded'

        return (
            <div className="column--50">
                <h1 className="title-big">Albums</h1>
                <div className="album-list-inner">
                    <div className={loader}></div>
                    <ul className="list-spaced">
                        {this.renderAlbumList()}
                    </ul>
                </div>
            </div>
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
function matchDispatchToProps(dispatch) {
    return bindActionCreators({
        addAlbumsData,
        selectAlbum
    }, dispatch)
}

// We don't want to return the plain component anymore, we want to return the smart Container
export default connect(mapStateToProps, matchDispatchToProps)(AlbumList)