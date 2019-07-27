import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class SearchBox extends Component {
    static propTypes = {
        placeholder: PropTypes.string,
        onPlacesChanged: PropTypes.func
    }
    render() {
        return <input ref="input" placeholder={this.props.placeholder} type="text" />;
    }
}