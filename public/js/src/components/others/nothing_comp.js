import React from 'react'
import PropTypes from 'prop-types'

export default class Nothing extends React.Component{
    render(){
        return(
            <div class='home_last_mssg'>
                <img src='/images/large.jpg' />
                <span>{this.props.mssg}</span>
            </div>
        )
    }
}

Nothing.defaultProps = {
    mssg: "Hello, a message for you!"
}

Nothing.propTypes = {
    mssg: PropTypes.string
}