// dependencies
import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

// actions
import { selectView, addAlbum } from '../../actions/index'

// style
import './style.styl'


class NewAlbum extends Component
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

    componentDidMount = () =>
    {
        this.form = {
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

        if (num > this.form.tracks.length)
            this.form.tracks.push(ReactDOM.findDOMNode(this.refs[`track${num}`]))

        // reset input form
        if (this.props.activeView === 'NEW_ALBUM_VIEW' && this.state.tracksNum < 2)
            this.setFocusOnInput()
    }

    componentWillReceiveProps = () =>
    {
        if (this.props.isFetching)
            this.setState({ loading: true })
        else
            this.setState({ loading: false })
    }

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

        if (this.state.loading)
            return

        const title = this.form.title.value
        const artist = this.form.artist.value
        const year = this.form.year.value
        const genre = this.form.genre.value

        let tracks = []
        for (let i = 0; i < this.state.tracksNum; i += 1) {
            let track = this.form.tracks[i].value

            if (track === null || track === '')
                continue

            tracks.push(track)
        }

        const album = { title, artist, year, genre, tracks }

        this.setState({ loading: true }, () => this.props.addAlbum(album))
    }

    clearInputFields = () =>
    {
        this.form.title.value = null
        this.form.artist.value = null
        this.form.year.value = null
        this.form.genre.value = null
        this.form.tracks.forEach(track => track.value = null)
    }

    setFocusOnInput = () => ReactDOM.findDOMNode(this.refs.title).focus()

    exitView = () => this.props.selectView('ALBUMS_VIEW')

    render()
    {
        const { activeView } = this.props

        let wrapperClass = 'wrapper new-album'
        if (activeView === 'NEW_ALBUM_VIEW')
            wrapperClass += ' active'

        let submitClass = 'btn'
        if (this.state.loading)
            submitClass += ' btn-loading'

        if (this.state.submitBtn.success)
            submitClass += ' success'

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
        isFetching: state.albums.isFetching
    }
}

// Get actions and pass them as props
function matchDispatchToProps(dispatch){
    return bindActionCreators({
        selectView,
        addAlbum
    }, dispatch)
}

// We don't want to return the plain component anymore, we want to return the smart Container
export default connect(mapStateToProps, matchDispatchToProps)(NewAlbum)