//var styles = 'body{color:red;}.u-isHidden {display: none;visibility: hidden;}';
//var Frame = React.createClass({
//    render: function () {
//        return <iframe />;
//    },
//    componentDidMount: function () {
//        this.renderFrameContents();
//    },
//    renderFrameContents: function () {
//        var doc = this.getDOMNode().contentWindow.document;

//        if (doc.readyState === 'complete') {
//            var contents = (
//                <div>
//                    <style>{this.props.styles}</style>
//                    {this.props.children}
//                </div>
//            );

//            React.renderComponent(contents, doc.body);
//        } else {
//            setTimeout(this.renderFrameContents, 0);
//        }
//    },
//    componentDidUpdate: function () {
//        this.renderFrameContents();
//    },
//    componentWillUnmount: function () {
//        React.unmountComponentAtNode(this.getDOMNode().contentWindow.document.body);
//    }
//});

import React, { Component } from 'react'

class Frame extends Component {
    constructor(props, context) {
        super(props, context)
        this.state = {
            title: 'BlackToque Software®',
        }
    }
    componentWillMount() {
    }
    componentDidMount() {
        this.renderFrameContents();
   }
    componentWillUnmount() {
        React.unmountComponentAtNode(this.getDOMNode().contentWindow.document.body);
   }
    componentDidUpdate() {
        React.unmountComponentAtNode(this.getDOMNode().contentWindow.document.body);
   }


    render() {
        return <iframe />;
    }

    renderFrameContents() {
        var doc = this.getDOMNode().contentWindow.document;

        if (doc.readyState === 'complete') {
            var contents = (
                <div>
                    <style>{this.props.styles}</style>
                    {this.props.children}
                </div>
            );

            React.renderComponent(contents, doc.body);
        } else {
            setTimeout(this.renderFrameContents, 0);
        }

    }

}


export default Frame
