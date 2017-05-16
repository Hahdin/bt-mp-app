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
        Ripple()
    }
    render() {
       return (
            <div id='center-div'>
                <canvas id="c"></canvas> 
            </div>
        )
    }
}
export default RippleSection
