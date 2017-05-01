import React, { Component } from 'react'

class PortfolioSection extends Component {
    render() {
        return (
            <div id="portfolio" className="container-fluid text-center bg-blue">
                <h2>Portfolio</h2><br />
                <h4>What we have created</h4>
                <div className="row text-center slideanim">
                    <div className="col-sm-4">
                        <div className="thumbnail">
                            <a href= "https://las-app.herokuapp.com/" target= "_blank">Las JSON App</a>
                            <img src="/images/LasApp.png" alt="Las App" width="200" height="200" />
                            <p><strong>Paris</strong></p>
                            <p>Displays LAS/JSON data</p>
                        </div>
                    </div>
                    {/*<div className="col-sm-4">
                        <div className="thumbnail">
                            <img src="newyork.jpg" alt="New York" width="400" height="300" />
                            <p><strong>New York</strong></p>
                            <p>We built New York</p>
                        </div>
                    </div>
                    <div className="col-sm-4">
                        <div className="thumbnail">
                            <img src="sanfran.jpg" alt="San Francisco" width="400" height="300" />
                            <p><strong>San Francisco</strong></p>
                            <p>Yes, San Fran is ours</p>
                        </div>
                    </div>*/}
                </div><br />

                <h2>What our customers say</h2>
                <div id="myCarousel" className="carousel slide text-center" data-ride="carousel">
                    <ol className="carousel-indicators">
                        <li data-target="#myCarousel" data-slide-to="0" className="active"></li>
                        <li data-target="#myCarousel" data-slide-to="1"></li>
                        <li data-target="#myCarousel" data-slide-to="2"></li>
                    </ol>

                    <div className="carousel-inner" role="listbox">
                        <div className="item active">
                            <h4>"This company is the best. I am so happy with the result!"<br /><span>Michael Roe, Vice President, Comment Box</span></h4>
                        </div>
                        <div className="item">
                            <h4>"One word... WOW!!"<br /><span>John Doe, Salesman, Rep Inc</span></h4>
                        </div>
                        <div className="item">
                            <h4>"Could I... BE any more happy with this company?"<br /><span>Chandler Bing, Actor, FriendsAlot</span></h4>
                        </div>
                    </div>

                    <a className="left carousel-control" href="#myCarousel" role="button" data-slide="prev">
                        <span className="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>
                        <span className="sr-only">Previous</span>
                    </a>
                    <a className="right carousel-control" href="#myCarousel" role="button" data-slide="next">
                        <span className="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>
                        <span className="sr-only">Next</span>
                    </a>
                </div>
            </div>)
    }
}
export default PortfolioSection
