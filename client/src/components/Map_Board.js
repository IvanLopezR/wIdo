import React, { Component } from 'react';
import Footer from './Footer';
import Map3 from './Map3';


export default class Map_Board extends Component {
    render() {
        return (
            <div className={'background-general background-index-' + Math.floor(Math.random() * 73 + 1)}>
                <div className="">
                        <Map3 className=""></Map3>
                    </div>
                <Footer></Footer>
            </div>
        )
    }
}
