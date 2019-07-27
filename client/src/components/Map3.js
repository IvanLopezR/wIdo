import React, { Component } from 'react'
import { GoogleMap, withScriptjs, withGoogleMap } from "react-google-maps";

function Map(){
    return <GoogleMap 
        defaultZoom={3}
        defaultCenter={{lat:39, lng:-3}}
    />
}

const WrappedMap = withScriptjs(withGoogleMap(Map))

export default class Map3 extends Component {
    render() {
        return (
            <div className="map-container" style={{ width: '98%', height: '100vh'}}>
                <div className="info-place">
                    <select className="form-control input-place">
                        <option value="Visit Place">Visit Place</option>
                        <option value="Food Place">Food Place</option>
                    </select>
                    <input className="form-control input-place" placeholder="Title"></input>
                </div>
                <WrappedMap googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${process.env.REACT_APP_GOOGLEMAPSAPIKEY}`}
                loadingElement={<div style={{ height: `100%` }} />}
                containerElement={<div style={{ height: `75vh` }} />}
                mapElement={<div style={{ height: `100%` }} />}
                />
            </div>
        )
    }
}
