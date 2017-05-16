import React, { Component } from 'react'
import { Router, Route, Link, IndexRoute, hashHistory, browserHistory, DefaultRoute, IndexLink } from 'react-router'
var hover = false

class NavBar extends Component {
    constructor(props, context) {
        super(props, context)
        this.state = {
        }
    }

    render() {
        var aStyle = {
            backgroundColor: '#2e0321',
            textShadow: '-2px -2px 3px black',
            textDecoration: 'none',
            padding: '20px'
        }
        return (
            <nav className="myNav navbar navbar-default navbar-fixed-top">
                <div className="container-fluid">
                    <div className="navbar-header">
                        <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#myNavbar">
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                        </button>
                        <div id="navhome" className="w3-ravi">
                            <a className="navbar-brand " href="/" >BlackToque</a>
                        </div>
                    </div>
                    <div id="myNavbar" className="collapse navbar-collapse">
                        <ul className="nav navbar-nav navbar-right">
                            <li><IndexLink className='ilink' activeStyle={aStyle} activeClassName='active' to='/'>Home</IndexLink></li>&nbsp;
                            <li><IndexLink className='ilink' activeStyle={aStyle} activeClassName='active' to='/about' onClick={clearAll()} >About</IndexLink></li>&nbsp;
                            <li><IndexLink className='ilink' activeStyle={aStyle} activeClassName='active' to='/services'>Services</IndexLink></li>&nbsp;
                            <li><IndexLink className='ilink' activeStyle={aStyle} activeClassName='active' to='/mathart'>Math Art</IndexLink></li>&nbsp;
                            <li><IndexLink className='ilink' activeStyle={aStyle} activeClassName='active' to='/ripple'>Water</IndexLink></li>&nbsp;
                            <li>
                                <IndexLink className='ilink' activeStyle={aStyle} activeClassName='active' to='/clock'>3D Clock</IndexLink>
                            </li>&nbsp;
                        </ul>
                    </div>
                </div>
            </nav>

         )
    }
 }
export default NavBar
