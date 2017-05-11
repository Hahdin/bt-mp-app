import React, { Component } from 'react'

class RippleSection extends Component {
    constructor(props, context) {
        super(props, context)
        this.state = {
            loaded: false
            
        }
    }
    componentDidMount() {
        this.state = ({ loaded: true })
        console.log('rip:did mount')
        Ripple()
    }
    render() {
        console.log('rip:render')
       return (
            <div id='center-div'>
                <canvas id="c"></canvas> 
                {this.state.loaded ? Ripple() : ""}
            </div>
        )
    }
}
export default RippleSection
