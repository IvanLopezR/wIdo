import React, { useState } from "react";
import { withScriptjs, withGoogleMap, GoogleMap } from "react-google-maps";
import { Marker, InfoWindow } from "react-google-maps";

const WrappedMap = withScriptjs(withGoogleMap((props) => {
    const [selectedMarker, setSelectedMarker] = useState(null);
    return (
        <GoogleMap
            defaultZoom={3}
            center={
                { lat: 40.416775, lng: -3.703790 }
            }
            onClick={props.newMarker}
        >
            {props.markers.map(marker => {
                return <Marker
                    key={marker._id}
                    position={
                        { lat: marker.coordinates.lat, lng: marker.coordinates.lng }
                    }
                    onClick={() => {
                        setSelectedMarker(marker);
                    }}
                />
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