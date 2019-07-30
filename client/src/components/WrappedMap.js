import React, { useState } from "react";
import { withScriptjs, withGoogleMap, GoogleMap } from "react-google-maps";
import { Marker, InfoWindow } from "react-google-maps";

const WrappedMap = withScriptjs(withGoogleMap((props) => {
    const [selectedMarker, setSelectedMarker] = useState(null);
    console.log(props.centerMap)
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
                if(marker.type==="Activity Place"){
                    return <Marker
                    animation={4}
                    key={marker._id}
                    position={
                        { lat: marker.coordinates.lat, lng: marker.coordinates.lng }
                    }
                    onClick={() => {
                        setSelectedMarker(marker);
                    }}
                    icon={{
                        url:'/activity-icon.png',
                        scaledSize: new window.google.maps.Size(30,42)
                    }}
                />
                }
                else if(marker.type==="Food Place"){
                    return <Marker
                    animation={4}
                    key={marker._id}
                    position={
                        { lat: marker.coordinates.lat, lng: marker.coordinates.lng }
                    }
                    onClick={() => {
                        setSelectedMarker(marker);
                    }}
                    icon={{
                        url:'/food-icon.png',
                        scaledSize: new window.google.maps.Size(30,42)
                    }}
                />
                }
                else if(marker.type==="Sleep Place"){
                    return <Marker
                    animation={4}
                    key={marker._id}
                    position={
                        { lat: marker.coordinates.lat, lng: marker.coordinates.lng }
                    }
                    onClick={() => {
                        setSelectedMarker(marker);
                    }}
                    icon={{
                        url:'/sleep-icon.png',
                        scaledSize: new window.google.maps.Size(30,42)
                    }}
                />
                }
                else{
                    return <Marker
                    animation={4}
                    key={marker._id}
                    position={
                        { lat: marker.coordinates.lat, lng: marker.coordinates.lng }
                    }
                    onClick={() => {
                        setSelectedMarker(marker);
                    }}
                />
                }
                
            })}
            
            {selectedMarker && (
                <InfoWindow position={
                    { lat: selectedMarker.coordinates.lat, lng: selectedMarker.coordinates.lng }
                }
                    onCloseClick={() => {
                        setSelectedMarker(null);
                    }}
                >
                    <div>
                        <h1 className="title-infowindow">{selectedMarker.title}</h1>
                        <button className="">Delete</button>
                        <span className="">{selectedMarker.timestamps}</span>
                        <img className="img-infowindow" src={selectedMarker.imgName}></img>

                    </div>
                </InfoWindow>
            )}
        </GoogleMap>
    );
}
))

export default WrappedMap;