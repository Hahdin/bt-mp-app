import React, { Component } from 'react'

class ContactSection extends Component {
    handleClick() {
        
        $(document).ready(function () {
            var from, to, subject, text;
            $("#emailButton").click(function () {
                //alert("email function running...")
                to = $("#email").val()
                subject = "test"
                text = $("#comments").val()
                 $("#message").text("Sending E-mail...Please wait")
                 $.get("/send", { to: to, subject: subject, text: text }, function (data, textStatus) {
                    alert("")
                    if (data == "sent") {
                        alert("You mail was sent, thank you")
                        //$.get("/")
                        $("#message").empty().html("Email is been sent at " + to + " .Please check inbox!")
                        //$("#message").html("Email is been sent at " + to + " .Please check inbox!")
                    }
                 })
                 $("#message").text("")

            })
        })
    }

    render() {
        return (


            <div id="contact" className="container-fluid bg-grey">
                <h2 className="text-center">CONTACT</h2>
                <div className="row">
                    <div className="col-sm-5">
                        <p>Contact us and we'll get back to you within 24 hours.</p>
                        <p><span className="glyphicon glyphicon-map-marker"></span> Calgary, Alberta</p>
                        {/*<p><span className="glyphicon glyphicon-phone"></span> +00 1515151515</p>
                        <p><span className="glyphicon glyphicon-envelope"></span> myemail@something.com</p>*/}
                    </div>
                    <div className="col-sm-7 slideanim">
                        <div className="row">
                            <div className="col-sm-6 form-group">
                                <input className="form-control" id="name" name="name" placeholder="Name" type="text" required />
                            </div>
                            <div className="col-sm-6 form-group">
                                <input className="form-control" id="email" name="email" placeholder="Email" type="email" required />
                            </div>
                        </div>
                        <textarea className="form-control" id="comments" name="comments" placeholder="Comment" rows="5"></textarea><br />
                        <div className="row">
                            <div className="col-sm-12 form-group">
                                <button id="emailButton" className="btn btn-default pull-right" type="submit" onClick={this.handleClick}>Send</button>
                            </div>
                            <div id="message"></div>
                        </div>
                    </div>
                </div>
            </div>


        )
    }
}
export default ContactSection
