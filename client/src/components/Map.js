import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';

class SimpleMap extends Component {
  constructor(props){
    super(props)

    this.state = {
      coordenadas : [{lat: 39.470242, lng: -0.376800}, {lat: 39.470242, lng: -1.376800}]
    }
  }

  cli(a,b){
    // document.querySelector('#map-id').addListener('click', function(event) {
      // console.log(event.latLng.lat() + ", " + event.latLng.lng());
      console.log("❤️")
      console.log(a)
      console.log(b)
    // })

  }

  setMapProperties(map, maps, cordenada) {
    new maps.Marker({
      position: cordenada,
      map,
      title: 'Valencia'
    });

    // const directionsService = new maps.DirectionsService;
    // const directionsDisplay = new maps.DirectionsRenderer;

    // const directionRequest = {
    //     origin: { lat: 41.3977381, lng: 2.190471916 },
    //     destination: 'Madrid, ES',
    //     travelMode: 'DRIVING'
    // };

    // directionsService.route(
    //     directionRequest,
    //     function (response, status) {
    //         if (status === 'OK') {
    //             // everything is ok
    //             directionsDisplay.setDirections(response);

    //         } else {
    //             // something went wrong
    //             window.alert('Directions request failed due to ' + status);
    //         }
    //     }
    // );

    // directionsDisplay.setMap(map);
  }

  render() {
    var defaultProps = {
      center: {
        lat: 41.3977381,
        lng: 2.190471916
      },
      zoom: 1
    };

    return (
      // Important! Always set the container height explicitly
      <div id="map-id" style={{ height: '60vh', width: '95%' }}>
        <GoogleMapReact
          onClick={(e) => this.cli(e)}
          bootstrapURLKeys={{ key: this.props.API_KEY }}
          defaultCenter={defaultProps.center}
          defaultZoom={defaultProps.zoom}
          onGoogleApiLoaded={({ map, maps }) => {
            this.state.coordenadas.map(cordenada => this.setMapProperties(map, maps, cordenada)) 
          }
          }
        >
        </GoogleMapReact>
      </div>
    );
  }
}

export default SimpleMap;