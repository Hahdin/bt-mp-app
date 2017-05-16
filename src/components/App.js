import React, { Component } from 'react'
import { Router, Route, Link, IndexRoute, hashHistory, browserHistory, DefaultRoute, IndexLink } from 'react-router'
import Jumbo from './Jumbo'
import AboutSection from './AboutSection'
import FooterSection from './FooterSection'
import ServicesSection from './ServicesSection'
import ContactSection from './ContactSection'
import NavBar from './NavBar'
import MathArt from './MathArt'
import RippleSection from './RippleSection'
import ClockSection from './ClockSection'   

class App extends Component {
    constructor(props, context) {
        super(props, context)
        this.state = {
            title: 'BlackToque Software®',
        }
    }

    render() {
        return (
            <Router history={hashHistory}>
                <Route path='/' component={Container}>
                    <IndexRoute component={Jumbo} />
                    <Route path='/about(/:name)' component={AboutSection} />
                    <Route path='/services' component={ServicesSection} />
                    <Route path='/mathart' component={MathArt} />
                    <Route path='/ripple' component={RippleSection} />
                    <Route path='/clock' component={ClockSection} />
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
