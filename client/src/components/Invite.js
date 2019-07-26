import React, { Component } from 'react';
import Footer from './Footer';
import Navbar from './Navbar';

export default class Invite extends Component {
    render() {
        return (
            <div className={'background-general background-index-' + Math.floor(Math.random() * 73 + 1)}>
                <Navbar logout={this.props.logout}></Navbar>
                <Footer></Footer>
            </div>
        )
    }
}
