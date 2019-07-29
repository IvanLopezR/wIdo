import React, { Component } from 'react'
import PlaceService from "../Services/PlaceService";
import WrappedMap from "./WrappedMap";

export default class MapEdit extends Component {

    constructor(props) {
        super(props);
        this.state = {
            lat: 0,
            lng: 0,
            places: []
        };
        this.idBtn = "btn-save";
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

    handleClick = (event) => {
        var lat = event.latLng.lat(), lng = event.latLng.lng()
        document.getElementById(this.idBtn).style.backgroundColor = "green";
        document.getElementById(this.idBtn).disabled = false;
        this.setState({
            ...this.state,
            lat: lat,
            lng: lng
        })
    }

    render() {
        return (
            <div className="map-container" style={{ width: '98%', height: '100vh' }}>
                <div >
                    <form className="info-place">
                        <button className="btn-save" id="btn-save" disabled>Save</button>
                        <input type="file" placeholder="Picture" required></input>
                        <select className="form-control input-place">
                            <option value="Visit Place">Visit Place</option>
                            <option value="Food Place">Food Place</option>
                        </select>
                        <input className="form-control input-place" placeholder="Title" required></input>
                    </form>
                </div>

                <WrappedMap
                    googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${process.env.REACT_APP_GOOGLEMAPSAPIKEY}`}
                    loadingElement={<div style={{ height: `100%` }} />}
                    containerElement={<div style={{ height: `75vh` }} />}
                    mapElement={<div style={{ height: `100%` }} />}
                    markers={this.state.places}
                    newMarker={this.handleClick}
                ></WrappedMap>
                <div className="coordinates">
                    <span className="coordinates-separate">Lat:{this.state.lat}</span>
                    <span>Lng:{this.state.lng}</span>
                </div>
            </div>
        )
    }
}