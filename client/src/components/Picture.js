import React, { Component } from 'react'
import UserServices from '../Services/UserService';

export default class Picture extends Component {
    constructor(){
        super();
        this.state = {
            imgName: ""
        }
        this.UserServices = new UserServices()
    }

    handleSubmit = e => {
        e.preventDefault();
        debugger;
        this.UserServices.saveNewThing(this.state.imgName)
        .then(res => {
            console.log('added: ', res);
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
            // after the console.log we can see that response carries 'secure_url' which we can use to update the state 
            // console.log(this.state.imgName);
            this.setState({ imgName: response.secure_url });
            // console.log(this.state.imgName);

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
                        <img src={this.props.imgName} alt={this.props.imgName} className="picture-change" id="picture" />
                        <form className="input-change-picture" onSubmit={e => this.handleSubmit(e)}>
                            <section>
                                <input type="file" onChange={e => this.handleFileUpload(e)} required />
                            </section>
                            <button className="btn-edit">Save new Picture</button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}