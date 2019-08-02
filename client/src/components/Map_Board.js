import React, { Component } from 'react';
import Footer from './Footer';
import MapEdit from './MapEdit';
import { withRouter } from 'react-router-dom';

class Map_Board extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        console.log(this.props)
        return (
            <div className={'background-general background-index-' + Math.floor(Math.random() * 73 + 1)}>
                <div>
                    <MapEdit community={this.props} loggedInUser={this.props} ></MapEdit>
                </div>
                <Footer></Footer>
            </div>
        )
    }
}

export default withRouter(Map_Board)