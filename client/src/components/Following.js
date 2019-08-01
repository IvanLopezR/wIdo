import React, { Component } from 'react';
import Footer from './Footer';
import User from './User';
import UserServices from "../Services/UserService"


export default class Following extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: []
        };
        this.users = [];
        this.service = new UserServices();
    }

    componentDidMount() {
        console.log(this.props._id)
        this.service.following(this.props._id)
            .then(allUsers => {
                console.log(allUsers)
                this.setState({
                    ...this.state,
                    user: allUsers
                })
                this.getUserData();
            });
    }

    searchUser(e) {
        e = e.target.value.slice(0, 1).toUpperCase() + e.target.value.slice(1, e.length);
        let newState = { ...this.state };
        let findUsers = newState.user.filter(ele => ele.name.indexOf(e)
            === 0);
        this.setState({
            ...this.state,
            user: findUsers
        }
            ,
            () => {
                this.state.user = [...newState.user]
            }
        );
    }

    getUserData(){
        // this.state.user.forEach(element => {
        //     this.service.following(this.props._id)
        //         .then(allUsers => {
        //             console.log(allUsers)
        //             this.setState({
        //                 ...this.state,
        //                 user: allUsers
        //             })
        //             this.getUserData();
        //         });
        // });
    }

    render() {
        console.log(this.state.user)
        return (
            <div className={'background-general background-index-19'}>
                <div className="content-adapt">
                    <input className="search-country" placeholder="Find user by name..." onChange={(e) => this.searchUser(e)}></input>
                    <div className="container-profile">
                        <div className="countries">
                            {this.state.user.map((feature, idx) => {
                                return <User id={feature} key={idx} />
                            })}
                        </div>
                    </div>
                    <Footer></Footer>
                </div>
            </div>
        )
    }
}