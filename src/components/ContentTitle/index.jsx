import React from 'react'

import "./index.scss"

class Input extends React.Component {

    render() {

        return (
            <div className="content-title">{this.props.text}</div>
        )
    }
}

export default Input