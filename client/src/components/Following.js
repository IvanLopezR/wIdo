import React, { Component } from 'react';
import Footer from './Footer';
import User from './User';
import UserServices from "../Services/UserService"

export default class Following extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: []
        };
        this.service = new UserServices();
    }

    componentDidMount() {
        this.service.following(this.props._id)
            .then(allUsers => {
                console.log(allUsers.data)
                this.setState({
                    ...this.state,
                    users: allUsers
                })
            });
    }

    searchUser(e) {
        e = e.target.value.slice(0, 1).toUpperCase() + e.target.value.slice(1, e.length);
        let newState = { ...this.state };
        let findUsers = newState.users.filter(ele => ele.name.indexOf(e)
            === 0);
        this.setState({
            ...this.state,
            users: findUsers
        }
            ,
            () => {
                this.state.users = [...newState.users]
            }
        );
    }

    render() {
        console.log(this.state.users)
        return (
            <div className={'background-general background-index-19'}>
                <div className="content-adapt">
                    <input className="search-country" placeholder="Find user by name..." onChange={(e) => this.searchUser(e)}></input>
                    <div className="container-profile">
                        <div className="countries">
                            {this.state.users.map((feature, idx) => {
                                console.log(...feature)
                                if (feature._id !== this.props._id) {
                                    return <User id={feature} key={idx} />
                                }
                            })}
                        </div>
                    </div>
                    <Footer></Footer>
                </div>
            </div>
        )
    }
}