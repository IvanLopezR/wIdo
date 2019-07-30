import React, { Component } from 'react'
import PlaceService from "../Services/PlaceService";
import UserService from "../Services/UserService";
import WrappedMap from "./WrappedMap";
import axios from "axios";
import { withRouter } from 'react-router-dom';
import { Marker } from "react-google-maps";


class MapEdit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            lat: 0,
            lng: 0,
            timestamps: "",
            places: [],
            title: "",
            imgName: "",
            type: "Visit Place",
            isLoading: false,
            centerCoor: {
                lat: 40.416775,
                lng: -3.703790,
            },
            click:null
        };
        this.control = false;
        this.idBtn = "btn-save";
        this.selectType = "select-type";
        this.pictPlace = "pict-place";
        this.titlePlace = "title-place";
        this.service = new PlaceService();
        this.userService = new UserService();
    }

    getCountry = () => {
        axios.get(`https://api.opencagedata.com/geocode/v1/json?q=${this.state.lat}+${this.state.lng}&key=b7625141969e4a07967359fe133e01cf`)
            .then(responseFromApi => {
                const country = responseFromApi.data
                this.userService.userCountries(country.results[0].components["ISO_3166-1_alpha-3"])
                    .then(userPlaces => {
                    })
            })
    }

    componentDidMount() {
        this.getPlaces()
    }

    getPlaces() {
        this.userService.findUserPlaces(this.props.user._id)
            .then(userPlaces => {
                console.log(userPlaces)
                // this.setState({ places: userPlaces.places })
                this.setState({
                    ...this.state,
                    places: userPlaces.places,
                }, () => {
                    this.setState({ isLoading: true })
                })
            })
    }

    handleChange = e => {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    handleFileUpload = e => {
        console.log("The file to be uploaded is: ", e.target.files[0]);
        console.log(this.state.lat)
        const uploadData = new FormData();
        uploadData.append("imgName", e.target.files[0]);
        this.service.placePicture(uploadData)
        
            .then(response => {
                this.setState({ imgName: response.secure_url });
                this.control = true;
                if (this.state.lat !== 0 || this.state.lng !== 0) {
                    document.getElementById(this.idBtn).style.backgroundColor = "green";
                    document.getElementById(this.idBtn).disabled = false;
                }
            })
            .catch(err => {
                console.log("Error while uploading the file: ", err);
            });
        console.log(this.state.imgName)
    }

    handleClick = (event) => {
        let clicky = <Marker
        animation={2}
        position={
            { lat: event.latLng.lat(), lng: event.latLng.lng()}
        }
        icon={{
            url:'/select-icon.png',
            scaledSize: new window.google.maps.Size(30,42)
        }}/>
        this.setState({...this.state, click: clicky})

        var lat = event.latLng.lat(), lng = event.latLng.lng()
        if (this.control) {
            document.getElementById(this.idBtn).style.backgroundColor = "green";
            document.getElementById(this.idBtn).disabled = false;
        }
        let newCenterCoor = {lat: lat, lng: lng}
        this.setState({
            ...this.state,
            lat: lat,
            lng: lng,
            centerCoor : newCenterCoor 
        })
    }

    putPlaceUser(reg) {

        this.userService.addPlace(reg)
            .then(res => {
                console.log('added: ', res);
                this.putPlaceUser(res._id);
            })
            .catch(err => {
                console.log("Error while adding the thing: ", err);
            });
    }

    handleSubmit = e => {
        e.preventDefault();
        const timestamp = Date.now();
        const todate = new Date(timestamp).getDate();
        const tomonth = new Date(timestamp).getMonth() + 1;
        const toyear = new Date(timestamp).getFullYear();
        const original_date = tomonth + '/' + todate + '/' + toyear;
        console.log(original_date);
        // const timestamps = new Intl.DateTimeFormat('en-US', {day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit'}).format(timestamp);
        this.service.saveNewThing(this.state.title, this.state.imgName, this.state.lat, this.state.lng, this.state.type, this.props.user._id, original_date)
            .then(res => {
                document.getElementById(this.idBtn).style.backgroundColor = "white";
                document.getElementById(this.idBtn).disabled = true;
                document.getElementById(this.selectType).value = "Visit Place";
                document.getElementById(this.pictPlace).value = "";
                document.getElementById(this.titlePlace).value = "";
                this.control = false;
                console.log(this.centerCoor, this.state)
                this.state.centerCoor.lat = this.state.lat;
                this.state.centerCoor.lng = this.state.lng;
                this.getCountry();
                console.log('added: ', res);
                this.setState({
                    lat: 0,
                    lng: 0,
                    title: "",
                    imgName: "",
                    timestamps: "",
                    type: "Visit Place",
                    // isLoading:false,
                    places: res.places,
                })
            })
            .catch(err => {
                console.log("Error while adding the thing: ", err);
            });
    }

    render() {
        console.log(this.state.places)
        console.log(this.state.isLoading)
        if (this.state.isLoading) {
            return (
                <div className="map-container" style={{ width: '98%', height: '100vh' }}>
                    <div >
                        <form className="info-place" onSubmit={this.handleSubmit}>
                            <button className="btn-save" id="btn-save" disabled>Save</button>
                            <input type="file" id="pict-place" onChange={(e) => this.handleFileUpload(e)} required></input>
                            <select className="form-control input-place" id="select-type" name="type" onChange={(e) => this.handleChange(e)}>
                                <option value="Visit Place">Visit Place</option>
                                <option value="Activity Place">Activity Place</option>
                                <option value="Food Place">Food Place</option>
                                <option value="Sleep Place">Sleep Place</option>
                            </select>
                            <input className="form-control input-place" placeholder="Title" id="title-place" name="title" onChange={(e) => this.handleChange(e)} required></input>
                        </form>
                    </div>

                    <WrappedMap
                        googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${process.env.REACT_APP_GOOGLEMAPSAPIKEY}`}
                        loadingElement={<div style={{ height: `100%` }} />}
                        containerElement={<div style={{ height: `75vh` }} />}
                        mapElement={<div style={{ height: `100%` }} />}
                        markers={this.state.places}
                        clicky={this.state.click}
                        newMarker={(e)=>{this.handleClick(e)}}
                        centerMap={this.state.centerCoor}
                    ></WrappedMap>
                    <div className="coordinates">
                        <span className="coordinates-separate">Lat:{this.state.lat}</span>
                        <span>Lng:{this.state.lng}</span>
                    </div>
                </div>
            )
        } else {
            return <h1>LOADING...</h1>
        }
    }
}

export default withRouter(MapEdit)