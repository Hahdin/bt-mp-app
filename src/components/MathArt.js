import React, { Component } from 'react'
import ReactDOM from 'react-dom'

class MathArt extends Component {
    constructor(props, context) {
        super(props, context)
        this.state = {
            loaded: false
        }
    }
    componentWillMount() {
    }
    componentDidMount() {
        var $this = $(ReactDOM.findDOMNode(this));
        StartDraw()
        this.state = ({loaded : true})

    }
    render() {

        return (
            <div >        <canvas id='canvas'></canvas> 
                {this.state.loaded ? StartDraw() : ""}
                    
            </div>)
    }
}
export default MathArt
