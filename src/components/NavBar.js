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
                        <a className="navbar-brand" href="/">BlackToque</a>
                    </div>
                    <div id="myNavbar" className="collapse navbar-collapse">
                        <ul className="nav navbar-nav navbar-right">
                            <li><IndexLink className='ilink' activeStyle={aStyle} activeClassName='active' to='/'>Home</IndexLink></li>&nbsp;
                            <li><IndexLink className='ilink' activeStyle={aStyle} activeClassName='active' to='/about' onClick={ClearTimers()} >About</IndexLink></li>&nbsp;
                            <li><IndexLink className='ilink' activeStyle={aStyle} activeClassName='active' to='/services'>Services</IndexLink></li>&nbsp;
                            <li><IndexLink className='ilink' activeStyle={aStyle} activeClassName='active' to='/mathart'>Math Art</IndexLink></li>&nbsp;
                        </ul>
                    </div>
                </div>
            </nav>
         )
    }
 }
export default NavBar
