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
        //alert('start clock')
        this.state = ({ loaded: true })

    }

    render() {
        ani = true;
        return (
            <div >
                {this.state.loaded ? StartClock() : ''}
                <div id='clockdiv' ></div>
            </div>)
    }
}
export default ClockSection
