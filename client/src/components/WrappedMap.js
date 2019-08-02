import React, { useState } from "react";
import { withScriptjs, withGoogleMap, GoogleMap } from "react-google-maps";
import { Marker, InfoWindow } from "react-google-maps";
import PlaceService from "../Services/PlaceService";
import moment from "moment";
import Axios from "axios";
import ZoomImg from "./ZoomImg";
const service = new PlaceService();


const WrappedMap = withScriptjs(withGoogleMap((props) => {
    const [selectedMarker, setSelectedMarker] = useState(null);

    return (
        <GoogleMap
            defaultZoom={3}
            center={
                { lat: props.centerMap.lat, lng: props.centerMap.lng }
            }
            onClick={props.newMarker}
        >

            {props.clicky}

            {props.markers.map(marker => {
                if (marker.type === "Activity Place") {
                    return <Marker
                        animation={4}
                        key={marker._id}
                        position={
                            { lat: marker.coordinates.lat, lng: marker.coordinates.lng }
                        }
                        onClick={() => {
                            props.openInfo();
                            setSelectedMarker(marker);
                        }}
                        icon={{
                            url: '/activity-icon.png',
                            scaledSize: new window.google.maps.Size(30, 42)
                        }}
                    />
                }
                else if (marker.type === "Food Place") {
                    return <Marker
                        animation={4}
                        key={marker._id}
                        position={
                            { lat: marker.coordinates.lat, lng: marker.coordinates.lng }
                        }
                        onClick={() => {
                            props.openInfo();
                            setSelectedMarker(marker);
                        }}
                        icon={{
                            url: '/food-icon.png',
                            scaledSize: new window.google.maps.Size(30, 42)
                        }}
                    />
                }
                else if (marker.type === "Sleep Place") {
                    return <Marker
                        animation={4}
                        key={marker._id}
                        position={
                            { lat: marker.coordinates.lat, lng: marker.coordinates.lng }
                        }
                        onClick={() => {
                            props.openInfo();
                            setSelectedMarker(marker);
                        }}
                        icon={{
                            url: '/sleep-icon.png',
                            scaledSize: new window.google.maps.Size(30, 42)
                        }}
                    />
                }
                else {
                    return <Marker
                        animation={4}
                        key={marker._id}
                        position={
                            { lat: marker.coordinates.lat, lng: marker.coordinates.lng }
                        }
                        onClick={() => {
                            props.openInfo();
                            setSelectedMarker(marker);
                        }}
                    />
                }

            })}

            {props.selectedMarkerOut?
            selectedMarker && (
                <InfoWindow position={
                    { lat: selectedMarker.coordinates.lat, lng: selectedMarker.coordinates.lng }
                }
                    onCloseClick={() => {
                        setSelectedMarker(null);
                    }}
                >
                    <div>
                        <h1 className="title-infowindow">{selectedMarker.title}</h1>
                        <div>
                            {props.user._id === props.loggedInUser._id && props.dele === "home" ? <button id="delete-btn" className="delete-btn-place" onClick={() => props.deleteF(selectedMarker)} >Delete</button> : ""}
                            <span className="date">{moment(selectedMarker.timestamps).format("DD/MM/YYYY hh:MM")}</span>
                        </div>
                        <img className="img-infowindow" src={selectedMarker.imgName}></img>
                    </div>
                </InfoWindow>
            ): ""}
        </GoogleMap>
    );
}
))

export default WrappedMap;