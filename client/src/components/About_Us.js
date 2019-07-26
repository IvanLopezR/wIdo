import React, { Component } from 'react';
import Footer from './Footer';
import Navbar from './Navbar';

export default class About_Us extends Component {
    render() {
        return (
            <div className={'background-general background-index-' + Math.floor(Math.random() * 73 + 1)}>
                <Navbar logout={this.props.logout}></Navbar>
                <div className="content-adapt">
                    <div className="container-profile">
                        <h4>Ironhack Madrid, Iván López Ruiz final project´s.</h4>
                    </div>
                </div>
                <Footer></Footer>
            </div>
        )
    }
}
