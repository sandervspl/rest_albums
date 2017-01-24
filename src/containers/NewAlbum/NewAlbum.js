// dependencies
import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import axios from 'axios'

// actions
import { selectView, addAlbumsData } from '../../actions/index'

// style
import './style.styl'


class NewAlbum extends Component
{
    constructor(props)
    {
        super(props)
        this.state = {
            tracksNum: 1
        }

        this.formFields = {}
    }

    componentDidMount = () =>
    {
        this.formFields = {
            title: ReactDOM.findDOMNode(this.refs.title),
            artist: ReactDOM.findDOMNode(this.refs.artist),
            year: ReactDOM.findDOMNode(this.refs.year),
            genre: ReactDOM.findDOMNode(this.refs.genre),
            tracks: [ ReactDOM.findDOMNode(this.refs['track1']) ]
        }
    }

    componentDidUpdate = () =>
    {
        const num = this.state.tracksNum

        if (num > this.formFields.tracks.length)
            this.formFields.tracks.push(ReactDOM.findDOMNode(this.refs[`track${num}`]))
    }

    updateTracksNum = (e) =>
    {
        const val = e.target.value
        const id = parseInt(e.target.dataset.id)

        if (val === null || val === '') {
            const num = this.state.tracksNum - 1
            this.formFields.tracks.splice(-1,1)
            this.setState({ tracksNum: num })
        }
        else if (val.length === 1) {
            const num = this.state.tracksNum + 1

            // max add 1 new input per input field
            if (num > id + 1)
                return

            this.setState({tracksNum: num})
        }
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

    handleSubmit = (e) => {
        // dont submit
        e.preventDefault()

        const title = this.formFields.title.value
        const artist = this.formFields.artist.value
        const year = this.formFields.year.value
        const genre = this.formFields.genre.value

        let tracks = []
        for (let i = 0; i < this.state.tracksNum; i += 1) {
            let track = this.formFields.tracks[i].value
            tracks.push(track)
        }

        const album = { title, artist, year, genre, tracks }
        // const ENDPOINT_CREATE_ALBUM = 'http://localhost:3000/api/products'
        const ENDPOINT_CREATE_ALBUM = 'https://rest0832970.herokuapp.com/api/products'

        // post new album data to server
        axios.post(ENDPOINT_CREATE_ALBUM, album, { headers: { 'Content-Type': 'application/json' }, data: {} })
            .then(result => {
                // get new album list data from server
                axios.get('https://rest0832970.herokuapp.com/api/products')
                // axios.get('http://localhost:3000/api/products')
                    .then(response => {
                        this.props.addAlbumsData(response.data.items)
                        this.props.selectView('ALBUMS_VIEW')
                    })
                    .catch(error => {
                        console.warn('Unable to GET from api.', error)
                        this.props.selectView('ALBUMS_VIEW')
                    })
            })
            .catch(error => {
                console.log('fail add', error)
                this.props.selectView('ALBUMS_VIEW')
            })
    }

    clearInputFields = () =>
    {

    }

    exitView = () => this.props.selectView('ALBUMS_VIEW')

    render()
    {
        const { activeView } = this.props
        let wrapperClass = 'wrapper new-album'

        if (activeView === 'NEW_ALBUM_VIEW')
            wrapperClass = 'wrapper new-album active'

        return (
            <div className={wrapperClass}>
                <h1 className="title-big">New Album</h1>
                <span className="exit" onClick={this.exitView}>×</span>
                <form action="" onSubmit={this.handleSubmit}>
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

                    <input type="submit" id="submit" name="submit" className="btn"/>
                </form>
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
    return bindActionCreators({
        selectView,
        addAlbumsData
    }, dispatch)
}

// We don't want to return the plain component anymore, we want to return the smart Container
export default connect(mapStateToProps, matchDispatchToProps)(NewAlbum)