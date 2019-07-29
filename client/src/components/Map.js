import React, { Component } from 'react'
import PlaceService from "../Services/PlaceService";
import WrappedMap from "./WrappedMap";

export default class Map extends Component {
    constructor(props) {
        super(props);
        this.state = {
            places: []
        };
        this.service = new PlaceService();
    }

    componentDidMount() {
        this.service.places()
            .then(allPlaces => {
                this.setState({
                    ...this.state,
                    places: allPlaces
                })
            })
    }

    render() {
        return (
            <WrappedMap
                googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${process.env.REACT_APP_GOOGLEMAPSAPIKEY}`}
                loadingElement={<div style={{ height: `100%` }} />}
                containerElement={<div style={{ height: `75vh` }} />}
                mapElement={<div style={{ height: `100%` }} />}
                markers={this.state.places}
                newMarker={this.handleClick}
            ></WrappedMap>
        )
    }
}