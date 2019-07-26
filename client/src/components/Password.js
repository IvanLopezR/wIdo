import React, { Component } from 'react';
import Footer from './Footer';
import Navbar from './Navbar';

export default class Password extends Component {
    render() {
        return (
            <div className={'background-general background-index-' + Math.floor(Math.random() * 73 + 1)}>
                <Navbar logout={this.props.logout}></Navbar>
                <div className="content-adapt">
                    <div className="container-profile">
                        <form action="./password/{{user.id}}" method="POST">
                            <div className="form-group">
                                <label for="password">Current Password: </label>
                                <input className="form-control" type="password" placeholder="Password" name="passwordForm" id="password" required />
                            </div>
                            <div className="form-group">
                                <label for="password2">New Password: </label>
                                <input className="form-control" type="password" placeholder="New password" name="newpasswordForm" id="password2" required />
                            </div>
                            <div className="form-group">
                                <label for="password3">Repeat New Password: </label>
                                <input className="form-control" type="password" placeholder="New password" name="newpassword2Form" id="password3" required />
                            </div>
                            <button class="btn-edit" onclick="Submit">Change Password</button>
                        </form>
                    </div>
                </div>
                <Footer></Footer>
            </div>
        )
    }
}
