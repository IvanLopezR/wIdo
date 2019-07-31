import React, { Component } from 'react';
import Footer from './Footer';
import { withRouter } from 'react-router-dom';
import AuthServices from '../Services/Services';

class Invite extends Component {
    constructor(props) {
        super(props);
        this.state = {
            emailFriend: '',
        };
        this.service = new AuthServices();
    }
    handleFormSubmit = (event) => {
        event.preventDefault();
        const emailFriend = this.state.emailFriend;
        this.service.invite(emailFriend)
            .then(response => {
                console.log(response)
                this.setState({
                    emailFriend: "",
                })
                document.getElementById("email-invite").value = "";
                document.getElementById("email-invite-ok").innerHTML = "Message sent successfully";
                
            })
            .catch(error => console.log(error))
    }

    handleChangeEmailFriend = (event) => {
        this.setState({
            emailFriend: event.target.value
        })
    }

    render() {
        return (
            <div className={'background-general background-index-61'}>
                <div className="container-invite">
                    <h2>Invite your friends to join <img src="logo-wido.png" className="img-invite"></img> and discover their favourites world places.</h2>
                    <h3>Share by email:</h3>
                    <form onSubmit={this.handleFormSubmit}>
                        <input type="email" id="email-invite" className="input-invite" value={this.state.emailFriend} onChange={e => this.handleChangeEmailFriend(e)} required autoFocus></input>
                        <button className="btn-invite">Send</button>
                        <div className="msg-err-invite">
                            <span id="email-invite-ok" className="email-invite-ok"></span>
                        </div>
                    </form>
                </div>
                <Footer></Footer>
            </div>
        )
    }
}

export default withRouter(Invite)