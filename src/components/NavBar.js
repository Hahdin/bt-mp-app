import React, { Component } from 'react'
import { Router, Route, Link, IndexRoute, hashHistory, browserHistory, DefaultRoute, IndexLink } from 'react-router'
var hover = false

class NavBar extends Component {
    constructor(props, context) {
        super(props, context)
        this.state = {
            //hover: false
        }
    }



    render() {
        var aStyle = {
            color: 'black',
            backgroundColor: 'white',
            textShadow: '-2px -2px 10px black',
            textDecoration: 'none',
            padding: '5px'
        }
        return (
                <nav className="myNav navbar">
                    <div>
                    <div id="myNavbar" className="navbar-collapse">
                            <ul >
                                <IndexLink className='ilink' activeStyle={aStyle} activeClassName='active' to='/'>Home</IndexLink>&nbsp;
                                <IndexLink className='ilink' activeStyle={aStyle} activeClassName='active' to='/about'>About</IndexLink>&nbsp;
                                <IndexLink className='ilink' activeStyle={aStyle} activeClassName='active' to='/services'>Services</IndexLink>&nbsp;
                                <IndexLink className='ilink' activeStyle={aStyle} activeClassName='active' to='/mathart'>Math Art</IndexLink>&nbsp;
                            </ul>
                        </div>
                    </div>
                </nav>
         )
    }
 }
export default NavBar
