// dependencies
import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'


class Pagination extends Component
{
    constructor(props)
    {
        super(props)
    }

    render()
    {
        return (
            <div>

            </div>
        )
    }
}

// Get apps state and pass it as props
function mapStateToProps(state) {
    return {

    }
}

// Get actions and pass them as props
function matchDispatchToProps(dispatch){
    return bindActionCreators({}, dispatch)
}

// We don't want to return the plain component anymore, we want to return the smart Container
export default connect(mapStateToProps, matchDispatchToProps)(Pagination)