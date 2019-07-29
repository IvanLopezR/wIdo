import React, { Component } from 'react';
import Footer from './Footer';
import MapEdit from './MapEdit';


export default class Map_Board extends Component {
    render() {
        return (
            <div className={'background-general background-index-' + Math.floor(Math.random() * 73 + 1)}>
                <div>
                    <MapEdit></MapEdit>
                </div>
                <Footer></Footer>
            </div>
        )
    }
}