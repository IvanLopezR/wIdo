import React, { Component } from 'react'
import PlaceService from "../Services/PlaceService";
import UserService from "../Services/UserService";
import WrappedMap from "./WrappedMap";
import axios from 'axios'
import { element } from 'prop-types';

export default class Map extends Component {
    constructor(props) {
        super(props);
        this.state = {
            places: [],
            centerCoor: {
                lat: 40.416775,
                lng: -3.703790,
            },
            selectedMarker: true,
            newCountries: []
        };
        this.dele="home"
        this.service = new PlaceService();
        this.userService = new UserService();
    }

    componentWillReceiveProps(nextProps) {
        // this.getPlaces();
        this.userService.findUserPlaces(nextProps.community)
            .then(userPlaces => {
                if (userPlaces !== null) {
                    this.setState({
                        ...this.state,
                        places: userPlaces.places,
                        newCountries: nextProps.loggedInUser.countries
                    }, () => {
                        this.setState({ isLoading: true })
                    })
                }
            })
    }

    deleteF = (obj) => {
        axios.get(`https://api.opencagedata.com/geocode/v1/json?q=${obj.coordinates.lat}+${obj.coordinates.lng}&key=b7625141969e4a07967359fe133e01cf`)
            .then(reponseFromApi => {
                const co = reponseFromApi.data
                const country = co.results[0].components["ISO_3166-1_alpha-3"]
                let newArray = this.state.newCountries
                console.log(newArray)
                this.service.deletePlace(obj._id, this.props.loggedInUser._id)
                    .then(res => {
                        let find = true
                        console.log(res)
                        for (let i = 0; i < newArray.length; i++) {
                            if (newArray[i] === country && find) {
                                newArray.splice(i, 1);
                                find = false;
                            }
                        }
                        console.log(newArray)
                        this.userService.changeInCountries(this.props.loggedInUser._id, newArray)
                            .then(res => {
                                console.log(res)
                            })
                        this.setState({
                            ...this.state,
                            places: this.state.places.filter(place => place._id !== res._id),
                            selectedMarker: !this.state.selectedMarker
                        })
                    });
            })
    }

    openInfo() {
        this.setState({ ...this.state, selectedMarker: true })
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
                user={this.props.community}
                loggedInUser={this.props.loggedInUser}
                deleteF={this.deleteF}
                selectedMarkerOut={this.state.selectedMarker}
                openInfo={() => this.openInfo()}
                dele={this.dele}
            ></WrappedMap>
        )
    }
}