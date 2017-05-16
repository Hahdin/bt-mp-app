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
        StartDraw()
        this.state = ({loaded : true})

    }
    render() {
        return (
            <div >
                <div  className="w3-panel w3-josefin">
                    This is an example of drawing with JavaScript on the <a href="https://www.w3schools.com/html/html5_canvas.asp"> HTML5 Canvas.</a>
                </div>
                <canvas id='canvas'></canvas> 
            </div>)
    }
}
export default MathArt
