// dependencies
import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import axios from 'axios'
const _ = require('lodash')

// vars
import { HOST_URL } from '../../vars/server'

// actions
import { selectView, selectAlbum, addAlbumsData } from '../../actions/index'


class EditAlbum extends Component
{
    constructor(props)
    {
        super(props)
        this.state = {
            loading: false,
            tracksNum: 1,
            submitBtn: {
                success: false,
                fail: false
            }
        }

        this.form = {}
    }

    reset = () =>
    {
        this.setState({
            loading: false,
            tracksNum: 1,
            submitBtn: {
                success: false,
                fail: false
            }
        })
    }

    componentDidMount = () =>
    {
        // grab fields
        this.form = {
            id: ReactDOM.findDOMNode(this.refs.albumid),
            title: ReactDOM.findDOMNode(this.refs.title),
            artist: ReactDOM.findDOMNode(this.refs.artist),
            year: ReactDOM.findDOMNode(this.refs.year),
            genre: ReactDOM.findDOMNode(this.refs.genre),
            tracks: []
        }
    }

    componentDidUpdate = () => this.syncNumAndLength()

    syncNumAndLength = () =>
    {
        const num = this.state.tracksNum
        const length = this.form.tracks.length

        if (num > length) {
            this.form.tracks.push(ReactDOM.findDOMNode(this.refs[`track${length + 1}`]))
            this.syncNumAndLength()
        }
    }

    componentWillReceiveProps = () => this.fillInputFields()

    updateTracksNum = (e) =>
    {
        const val = e.target.value
        const id = parseInt(e.target.dataset.id)

        if (val === null || val === '') {
            const num = this.state.tracksNum - 1
            this.form.tracks.splice(-1,1)
            this.setState({ tracksNum: num })
        }
        else if (val.length === 1) {
            const num = this.state.tracksNum + 1

            // max add 1 new input per input field
            if (num > id + 1)
                return

            this.setState({ tracksNum: num })
        }
    }

    exitView = () => {
        this.props.selectView('ALBUMS_VIEW')
        this.clearInputFields()
    }

    renderTracksInputList()
    {
        let tracks = []
        for (let i = 0; i < this.state.tracksNum; i += 1) {
            const id = i + 1
            const trackId = `track${id}`
            const ph = `Track ${id}`
            tracks.push(
                <label key={id} htmlFor={trackId}>
                    <input
                        key={id}
                        id={trackId}
                        ref={trackId}
                        data-id={id}
                        type="text"
                        name={trackId}
                        placeholder={ph}
                        onChange={this.updateTracksNum}
                    />
                </label>
            )
        }

        return tracks
    }

    updateAlbumToServer = (album) =>
    {
        const ENDPOINT_GET = `${HOST_URL}/api/products`
        const ENDPOINT_PUT = `${HOST_URL}/api/products/${album.id}`

        axios.put(ENDPOINT_PUT, album, {headers: {'Content-Type': 'application/json'}, data: {}})
            .then(response => {
                // get new album list data from server
                axios.get(ENDPOINT_GET)
                    .then(response => {
                        this.setState({ submitBtn: { success: true } }, () => this.refreshAlbumList(response.data.items, album))
                    })
                    .catch(error => {
                        this.setState({ loading: false }, () => {
                            console.warn('Unable to PUT to api.', error)
                            this.props.selectView('ALBUMS_VIEW')
                        })
                    })
            })
            .catch(error => { console.log('fail add', error) })
    }

    refreshAlbumList = (albums, album) =>
    {
        this.setState({ loading: false, tracksNum: 1 }, () => {
            this.props.addAlbumsData(albums)
            this.props.selectAlbum(album)
            this.props.selectView('ALBUMS_VIEW')
            this.clearInputFields()

            this.setState({
                submitBtn: {
                    success: false
                }
            })
        })
    }

    handleSubmit = (e) =>
    {
        // dont submit
        e.preventDefault()

        if (this.state.loading)
            return

        const id = this.form.id.value
        const title = this.form.title.value
        const artist = this.form.artist.value
        const year = this.form.year.value
        const genre = this.form.genre.value

        // grab tracklist
        let tracks = []
        this.form.tracks.forEach(track => {
            if (track.value === '')
                return

            tracks.push(track.value)
        })

        const album = { id, title, artist, year, genre, tracks }

        // post new album data to server
        this.setState({ loading: true }, () => this.updateAlbumToServer(album))
    }

    clearInputFields = () =>
    {
        this.form.title.value = null
        this.form.artist.value = null
        this.form.year.value = null
        this.form.genre.value = null
        this.form.tracks.forEach(track => track.value = '')
        this.form.tracks = []

        this.reset()
    }

    fillInputFields = () =>
    {
        // grab album being edited
        const editAlbum = this.props.activeAlbum

        if (_.isEmpty(editAlbum))
            return

        // fill in fields
        this.form.title.value = editAlbum.title
        this.form.artist.value = editAlbum.artist
        this.form.year.value = editAlbum.year
        this.form.genre.value = editAlbum.genre

        // fill in all tracks
        const tracksNum = editAlbum.tracks.length + 1 // 1 extra for empty input field
        this.setState({ tracksNum }, () => {
            let tracks = []
            editAlbum.tracks.forEach((track, index) => {
                const i = index + 1
                const input = ReactDOM.findDOMNode(this.refs[`track${i}`])

                if ( ! input)
                    return

                tracks.push(input)
                input.value = track
            })

            this.form.tracks = tracks
        })
    }

    render()
    {
        const { activeView } = this.props
        let albumid = this.props.activeAlbum !== null ? this.props.activeAlbum.id : ''

        let wrapperClass = 'wrapper new-album'
        if (activeView === 'EDIT_ALBUM_VIEW') {
            wrapperClass += ' active'
        }

        let submitClass = 'btn'
        if (this.state.loading)
            submitClass += ' btn-loading'

        if (this.state.submitBtn.success)
            submitClass += ' success'

        return (
            <div className={wrapperClass}>
                <h1 className="title-big">Edit Album</h1>
                <span className="exit" onClick={this.exitView}>×</span>
                <form action="" onSubmit={this.handleSubmit}>
                    <input type="hidden" ref="albumid" value={albumid}/>
                    <label htmlFor="title">
                        <input type="text" id="title" name="title" ref="title" placeholder="title" className="row--50 fat" autoFocus="autoFocus"/>
                    </label>

                    <label htmlFor="artist">
                        <input type="text" id="artist" name="artist" ref="artist" placeholder="artist" className="row--50 fat"/>
                    </label>

                    <label htmlFor="year">
                        <input type="number" id="year" name="year" ref="year" placeholder="year" className="row--50"/>
                    </label>

                    <label htmlFor="genre">
                        <input type="text" id="genre" name="genre" ref="genre" placeholder="genres" className="row--50"/>
                    </label>

                    <div className="track-list">
                        {this.renderTracksInputList()}
                    </div>

                    <input type="submit" id="submit" name="submit" className={submitClass}/>
                </form>
            </div>
        )
    }
}

// Get apps state and pass it as props
function mapStateToProps(state) {
    return {
        activeView: state.activeView,
        editAlbum: state.editAlbum,
        activeAlbum: state.activeAlbum
    }
}

// Get actions and pass them as props
function matchDispatchToProps(dispatch){
    return bindActionCreators({
        selectView,
        addAlbumsData,
        selectAlbum
    }, dispatch)
}

// We don't want to return the plain component anymore, we want to return the smart Container
export default connect(mapStateToProps, matchDispatchToProps)(EditAlbum)