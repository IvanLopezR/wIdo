import React, { Component } from 'react'
import Footer from './Footer';
import AuthServices from '../Services/Services';
import UserServices from '../Services/UserService';

export default class Message extends Component {
    constructor(props) {
        super(props);
        this.state = {
            contentText: "",
        };
        this.service = new AuthServices();
        this.userServices = new UserServices();
    }

    handleFormSubmit = (event) => {
        event.preventDefault();
        const emailUs = this.props.usEmail;
        this.userServices.selectUser(emailUs)
            .then(response => {
                console.log(this.state.contentText)
                this.service.email(response, this.state.contentText, this.props)
                    .then(processOk => {
                        console.log(processOk)
                    })
                this.setState({
                    contentText: "",
                })
                document.getElementById("email-invite").value = "";
                document.getElementById("email-invite-ok").innerHTML = "Message sent successfully";
            })
            .catch(error => console.log(error))
    }

    handleChangeEmailFriend = (event) => {
        this.setState({
            contentText: event.target.value
        })
    }
    render() {
        return (
            <div className={'background-general background-index-19'}>
                <div className="content-adapt">
                    <div className="sep-vertical">
                        <textarea className="text-area" id="email-invite" onChange={e => this.handleChangeEmailFriend(e)} required autoFocus></textarea>
                        <form onSubmit={this.handleFormSubmit}>
                            <button className="btn-message">Send Message</button>
                            <div className="msg-err-email">
                                <span id="email-invite-ok" className="email-invite-ok"></span>
                            </div>
                        </form>
                    </div>
                </div>
                <Footer></Footer>
            </div>
        )
    }
}

