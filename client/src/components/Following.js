import React, { Component } from 'react';
import Footer from './Footer';
import User from './User';
import UserServices from "../Services/UserService"

export default class Following extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [],
            usersExpand : []
        };
        this.service = new UserServices();
    }

    componentDidMount() {
        this.service.following(this.props._id)
            .then(allUsers => {
                this.setState({
                    ...this.state,
                    users: allUsers
                })
                this.getUserData();
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

    getUserData(){
        let newUsers= []
        this.state.users.map(elem => {
            this.service.getUserExtend(elem)
                .then(user => {
                    newUsers.push(user)
                    this.setState({...this.state, usersExpand:newUsers})
                })
        })
    }

    render() {
        console.log(this.usersExpand);
        return (
            <div className={'background-general background-index-19'}>
                <div className="content-adapt">
                    <input className="search-country" placeholder="Find user by name..." onChange={(e) => this.searchUser(e)}></input>
                    <div className="container-profile">
                        <div className="countries">
                            {this.state.usersExpand.map((feature, idx) => {
                                console.log(feature)
                                return <User {...feature} key={idx} />
                            })}
                        </div>
                    </div>
                    <Footer></Footer>
                </div>
            </div>
        )
    }
}