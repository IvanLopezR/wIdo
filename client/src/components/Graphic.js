import React, { Component } from 'react'
import { Chart } from "react-charts";
import UserServices from "../Services/UserService"

const data = [
    {
        label: "Series 1",
        data: [{ x: 1, y: 100 }, { x: 2, y: 50 }, { x: 3, y: 100 }]
    },
    {
        label: "Series 2",
        data: [{ x: 1, y: 200 }, { x: 2, y: 100 }, { x: 3, y: 300 }]
    },
    {
        label: "Series 3",
        data: [{ x: 1, y: 30 }, { x: 2, y: 300 }, { x: 3, y: 50 }]
    },
    {
        label: "Series 4",
        data: [{ x: 1, y: 150 }, { x: 2, y: 200 }, { x: 3, y: 300 }]
    },
    {
        label: "Series 5",
        data: [{ x: 1, y: 100 }, { x: 2, y: 10 }, { x: 3, y: 200 }]
    },
]


export default class Graphic extends Component {
    constructor(props){
        super(props);
        this.isLoading = false;
        this.service = new UserServices();
        this.users = [];
    }

    componentDidMount() {
        this.service.allUsers()
            .then(allUsers => {
                this.users=allUsers
                this.getBestUser()
            });
    }

    getBestUser(){
        console.log(this.users);
    }

    render() {
        return (
            <div>
                <div
                    style={{
                        width: "1200px",
                        height: "600px"
                    }}
                >
                    <br/><br/>
                    <Chart
                        data={data}
                        axes={[
                            { primary: true, type: "ordinal", position: "bottom" },
                            { type: "linear", position: "left" }
                        ]}
                    />
                    <h3>1.Line Blue</h3>
                    <h3>2.Line Red</h3>
                    <h3>3.Line Yellow</h3>
                    <h3>4.Line Green</h3>
                    <h3>5.Line Orange</h3>
                    <p>Countries, pictures, followers</p>
                </div>
            </div>
        )
    }
}