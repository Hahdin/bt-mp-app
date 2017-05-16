import React, { Component } from 'react'
import ReactDOM from 'react-dom'

class ClockSection extends Component {
    constructor(props, context) {
        super(props, context)
        this.state = {
            loaded: false
        }
    }
    componentDidMount() {
        StartClock()
        this.state = ({ loaded: true })

    }

    render() {
        ani = true;
        return (
            <div >
                <div id='clockdiv' ></div>
            </div>)
    }
}
export default ClockSection
