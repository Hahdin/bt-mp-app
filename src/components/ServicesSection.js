import React, { Component } from 'react'

class ServicesSection extends Component {
    constructor(props, context) {
        super(props, context)
        this.state = {
            mouseOver: false
        }
        // This binding is necessary to make `this` work in the callback
        //this.initSlide = this.initSlide.bind(this);
    }
    initSlide() {
        alert(this.state.mouseOver )
        this.setState(prevState => ({
            mouseOver: !prevState.mouseOver
        }))

        //this.setState({ mouseOver: !this.state.mouseOver })
    }

    render() {
        
        return (
            <div id="services" className="container-fluid text-center" >
                
                <h2>SERVICES</h2>
                <h4>What we offer</h4>
                <br />
                    <div className="row slideanim slide">
                        <div className="col-sm-4">
                            <span className="glyphicon glyphicon-off logo-small"></span>
                            <h4>POWER</h4>
                            <p>Lorem ipsum dolor sit amet..</p>
                        </div>
                        <div className="col-sm-4">
                            <span className="glyphicon glyphicon-heart logo-small"></span>
                            <h4>LOVE</h4>
                            <p>Lorem ipsum dolor sit amet..</p>
                        </div>
                        <div className="col-sm-4">
                            <span className="glyphicon glyphicon-lock logo-small"></span>
                            <h4>JOB DONE</h4>
                            <p>Lorem ipsum dolor sit amet..</p>
                        </div>
                    </div>
                    <br /><br />
                        <div className="row slideanim slide">
                            <div className="col-sm-4">
                                <span className="glyphicon glyphicon-leaf logo-small"></span>
                                <h4>GREEN</h4>
                                <p>Lorem ipsum dolor sit amet..</p>
                            </div>
                            <div className="col-sm-4">
                                <span className="glyphicon glyphicon-certificate logo-small"></span>
                                <h4>CERTIFIED</h4>
                                <p>Lorem ipsum dolor sit amet..</p>
                            </div>
                            <div className="col-sm-4">
                                <span className="glyphicon glyphicon-wrench logo-small"></span>
                                <h4 style={{color:'#303030'}}>HARD WORK</h4>
                                <p>Lorem ipsum dolor sit amet..</p>
                            </div>
                        </div>
</div>)
    }
}
export default ServicesSection
