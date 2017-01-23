// dependencies
import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import axios from 'axios'

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
    }

    updateTracksNum = (e) =>
    {
        const val = e.target.value
        const id = parseInt(e.target.dataset.id)

        if (val === null || val === '') {
            const num = this.state.tracksNum - 1
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

        const title = ReactDOM.findDOMNode(this.refs.title).value
        const artist = ReactDOM.findDOMNode(this.refs.artist).value
        const year = ReactDOM.findDOMNode(this.refs.year).value
        const genre = ReactDOM.findDOMNode(this.refs.genre).value

        let tracks = []
        for (let i = 1; i < this.state.tracksNum; i += 1) {
            let track = ReactDOM.findDOMNode(this.refs[`track${i}`]).value
            tracks.push(track)
        }

        const endpoint = 'https://rest0832970.herokuapp.com/api/products'
        const options = { title, artist, year, genre, tracks }

        axios.post(endpoint, options)
            .then(result => {
                console.log('posted to api')
                console.log(result)
            })
            .catch(error => {
                console.log('Unable to POST to api', error)
            })
    }

    render()
    {
        const { activeView } = this.props
        let wrapperClass = 'wrapper new-album'

        if (activeView === 'NEW_ALBUM_VIEW')
            wrapperClass = 'wrapper new-album active'

        return (
            <div className={wrapperClass}>
                <h1 className="title-big">New Album</h1>
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
    return bindActionCreators({}, dispatch)
}

// We don't want to return the plain component anymore, we want to return the smart Container
export default connect(mapStateToProps, matchDispatchToProps)(NewAlbum)