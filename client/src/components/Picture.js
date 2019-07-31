import React, { Component } from 'react'
import UserServices from '../Services/UserService';
import { withRouter } from 'react-router-dom';

class Picture extends Component {
    constructor() {
        super();
        this.state = {
            imgName: "",
        }
        this.UserServices = new UserServices()
    }

    componentDidMount() {
        this.setState({
            ...this.state,
            imgName: this.props.imgName
        })
    }

    handleSubmit = e => {
        e.preventDefault();
        console.log(this.state.imgName)
        this.UserServices.saveNewThing(this.state.imgName)
            .then(res => {
                console.log('added: ', res);
                this.props.fetchUser();
                this.props.history.push('/Profile')
                // here you would redirect to some other page 
            })
            .catch(err => {
                console.log("Error while adding the thing: ", err);
            });
    }

    handleFileUpload = e => {
        console.log("The file to be uploaded is: ", e.target.files[0]);

        const uploadData = new FormData();
        // imageUrl => this name has to be the same as in the model since we pass
        // req.body to .create() method when creating a new thing in '/api/things/create' POST route
        uploadData.append("imgName", e.target.files[0]);
        this.UserServices.changePicture(uploadData)
            .then(response => {
                console.log('response is: ', response);
                this.setState({ imgName: response.secure_url });
                document.getElementById("btn-change-pict").disabled=false;
            })
            .catch(err => {
                console.log("Error while uploading the file: ", err);
            });
    }

    render() {
        return (
            <div className={'background-general background-index-' + Math.floor(Math.random() * 73 + 1)}>
                <div className="content-adapt">
                    <div className="container-edit">
                        <img src={this.state.imgName} alt={this.props.imgName} className="picture-change" id="picture" />
                        <form className="input-change-picture" onSubmit={this.handleSubmit}>
                            <section>
                                <input type="file" onChange={e => this.handleFileUpload(e)} required />
                            </section>
                            <input className="btn-edit" id="btn-change-pict" type="submit" value="Save new Picture" disabled/>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(Picture)