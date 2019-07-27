import React, { Component } from 'react';
import Footer from './Footer';

export default class Invite extends Component {
    render() {
        return (
            <div className={'background-general background-index-' + Math.floor(Math.random() * 73 + 1)}>
                <Footer></Footer>
            </div>
        )
    }
}
