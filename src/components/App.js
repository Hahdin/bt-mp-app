/*
var React = require('react');
var ReactDOM = require('react-dom');
var NavBar = require('./NavBar');

var App = React.createClass({
    getInitialState: function () {
        return ({
            title: 'React Website App',
        });
    },
    componentWillMount: function () {

    },
    componentDidMount: function () {
        //var _this = this;
        //this.serverRequest =
        //    axios
        //        .get("file.json")
        //        .then(function (result) {
        //            _this.setState({
        //                file: result.data.MainSectioninFile,
        //            });
        //        })
    },
    componentWillUnmount: function () {
        //this.serverRequest.abort();
    },
    render: function () {
        return (
            <div>
                <NavBar />
                <h1>
                    Website
                    </h1>
            </div>
        );
    }
});
export default App
*/
//Route example

import React, { Component } from 'react'
import { Router, Route, Link, IndexRoute, hashHistory, browserHistory, DefaultRoute, IndexLink } from 'react-router'
import Jumbo from './Jumbo'
import AboutSection from './AboutSection'
import FooterSection from './FooterSection'
import ServicesSection from './ServicesSection'
import PortfolioSection from './PortfolioSection'
import PricingSection from './PricingSection'
import ContactSection from './ContactSection'
import GoogleMapSection from './GoogleMapSection'
import NavBar from './NavBar'
import MathArt from './MathArt'
class App extends Component {
    constructor(props, context) {
        super(props, context)
        this.state = {
            title: 'BlackToque Software®',
        }
    }
    componentWillMount() {
    }
    componentDidMount() {
    }
    componentWillUnmount() {
    }
    componentDidUnmount() {
    }


    render() {
        //ClearTimers();
        return (
            <Router history={hashHistory}>
                <Route path='/' component={Container}>
                    <IndexRoute component={Jumbo} />
                    <Route path='/about(/:name)' component={AboutSection} />
                    <Route path='/services' component={ServicesSection} />
                    <Route path='/mathart' component={MathArt} />
                    <Route path='*' component={NotFound} />
                </Route>
            </Router>
        )
    }
}

const Container = (props) =>
    <div>
        <NavBar />
        {props.children}
    </div>

const NotFound = () => <h1>404.. This page is not found!</h1>

export default App
