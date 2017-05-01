import React, { Component } from 'react'

class AboutSection extends Component {
    render() {
        return (<div>
            <div id="about" className="container-fluid">
                <div className="row">
                    <div className="col-sm-8">
                        <h2>About BlackToque Software</h2><br />
                        <img src="/images/BT.jpg"/>
                        <h4>We make Apps</h4><br />
                        <p>Need an App? How about a SPA for your small business or organization? Look no further!</p>
                        <br /><button className="btn btn-default btn-lg">Get in Touch</button>
                    </div>
                    <div className="col-sm-4">
                        <span className="glyphicon glyphicon-signal logo"></span>
                    </div>
                </div>
            </div>
            <div className="container-fluid bg-grey">
                <div className="row">
                    <div className="col-sm-4">
                        <span className="glyphicon glyphicon-globe logo slideanim slide"></span>
                    </div>
                    <div className="col-sm-8">
                        <h2>Our Values</h2><br />
                        <h4><strong>MISSION:</strong> Providing the best in quality and service</h4><br />
                        <p><strong>VISION:</strong> An App on every device</p>
                    </div>
                </div>
            </div>
        </div>)
    }
}
export default AboutSection
