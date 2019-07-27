import React, { Component } from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';

const style = {
    width: '98%',
    height: '75vh',
  }

export class Map2 extends Component {
    constructor(props){
        super(props)
        this.state = {
            prueba:{
                longi:0,
                lati:0,
            },
            markers: [
              {
                title: "The marker`s title will appear as a tooltip.",
                name: "SOMA",
                position: { lat: 37.778519, lng: -122.40564 }
              }
            ]
          };
        this.onClick = this.onClick.bind(this);
      }

      onClick(t, map, coord) {
        const { latLng } = coord;
        const lat = latLng.lat();
        const lng = latLng.lng();
        this.state.prueba.longi=lng;
        this.state.prueba.lati=lat;
        console.log(this.state.prueba);
        this.setState(previousState => {
          return {
            markers: [
              ...previousState.markers,
              {
                title: "",
                name: "",
                position: { lat, lng }
              }
            ]
          };
        });
    }

    render() {
        console.log(this.state.markers[0].name);
        return (
            <div className="map-container">
                <Map google={this.props.google}
                style={style}
                initialCenter={{
                  lat: 39.854885,
                  lng: -3.381807
                }}
                zoom={3}
                onClick={this.onClick}
                >
                    <Marker onClick={this.onMarkerClick}
                        name={'Current location'} />

                    <InfoWindow onClose={this.onInfoWindowClose}>
                        <div>
                            <h1>{this.state.markers[0].name}</h1>
                        </div>
                    </InfoWindow>
                </Map>
            </div>
        )
    }
}

export default GoogleApiWrapper({
    apiKey: (process.env.REACT_APP_GOOGLEMAPSAPIKEY)
  })(Map2)