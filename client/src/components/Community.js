import React, { Component } from 'react';
import Footer from './Footer';
import User from './User';
import UserServices from "../Services/UserService"

export default class Community extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: []
        };

        this.service = new UserServices();
    }

    componentDidMount() {
        this.service.allUsers()
            .then(allUsers => {
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
        return (
            <div className={'background-general background-index-62'}>
                <div className="content-adapt">
                    <input className="search-country" placeholder="Find user by name..." onChange={(e) => this.searchUser(e)}></input>
                    <div className="container-profile">
                        <div className="countries">
                            {this.state.users.map((feature, idx) => {
                                return <User {...feature} key={idx} />
                            })}
                        </div>
                    </div>
                </div>
                <Footer></Footer>
            </div>
        )
    }
}
