import React, { Component } from 'react'

class AboutSection extends Component {
    render() {
        var sty = {
            color: 'blue',
            fontSize: '17px',

        }
       return (<div>
            <div id="about" className="container-fluid">
                <div className="row">
                    <div className="col-sm-8">
                        <h2>About BlackToque Software</h2><br />
                        <img src="/images/BT.jpg"/>
                        <h4>We make Apps</h4><br />
                        <br /><button className="btn btn-default btn-lg">Get in Touch</button>
                    </div>
                    <div id="intromsg" className="w3-panel w3-josefin">
                        <p>
                            This site serves to showcase examples of various techniques used in the production of web applications. There are
                                   many different technologies used today, each depending on the expectations and needs of the client base.
                       </p>
                        <p>
                           This is an example of a Multi Page Application. Most sections (About, Services, etc) are created as
                           <a style={sty} href="https://github.com/facebook/react"> React components</a>.  Rather than the main App composing the final render,
                           as in an SPA, this is using React's <a style={sty}  href="https://github.com/ReactTraining/react-router"> Router</a> to render individual components 
                               on a page. 
                           <p className="well">For an example of an Single Page Application using this template see <a href="https://ex0001.herokuapp.com/"> BlackToque - SPA </a></p>
                           The theme is based on a <a style={sty} href="https://www.w3schools.com/bootstrap/bootstrap_theme_company.asp" target="_blank"> Bootstrap template for a company.</a>
                                The Application Framework is <a style={sty} href="https://expressjs.com/" target="_blank"> Express 4.15.2</a> for
                                   <a style={sty} href="https://nodejs.org/en/" target='_blank'> Node.js</a>
                        </p>

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
