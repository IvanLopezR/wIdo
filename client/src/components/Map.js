import React, { Component } from 'react'
import PlaceService from "../Services/PlaceService";
import UserService from "../Services/UserService";
import WrappedMap from "./WrappedMap";

export default class Map extends Component {
    constructor(props) {
        super(props);
        this.state = {
            places: [],
            centerCoor: {
                lat: 40.416775,
                lng: -3.703790,
            }
        };
        this.service = new PlaceService();
        this.userService = new UserService();
    }

    componentDidMount() {
        this.getPlaces();
    }

    getPlaces() {
        this.userService.findUserPlaces(this.props.user._id)
            .then(userPlaces => {
                console.log(userPlaces)
                if(userPlaces!==null){
                    this.setState({
                        ...this.state,
                        places: userPlaces.places,
                    }, () => {
                        this.setState({ isLoading: true })
                    })
                }
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
                centerMap={this.state.centerCoor}
            ></WrappedMap>
        )
    }
}