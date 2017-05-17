import React, { Component } from 'react'
//not implemented yet
class SurveySection extends Component {
    componentDidMount() {
        WellPath()
    }

    render() {
        return (
                <div id='surveydiv' >
                    <div id='container'></div>
                    <div id='blocker'>
                        <div id='instructions'><strong> Loading...</strong ></div >
                    </div>
                </div>


        )
    }
}
export default SurveySection
