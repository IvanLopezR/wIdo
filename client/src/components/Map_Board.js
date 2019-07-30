import React, { Component } from 'react';
import Footer from './Footer';
import MapEdit from './MapEdit';
import { withRouter } from 'react-router-dom';

class Map_Board extends Component {
    render() {
        console.log(this.props)
        return (
            <div className={'background-general background-index-' + Math.floor(Math.random() * 73 + 1)}>
                <div>
                    <MapEdit user={this.props}></MapEdit>
                </div>
                <Footer></Footer>
            </div>
        )
    }
}

export default withRouter(Map_Board)