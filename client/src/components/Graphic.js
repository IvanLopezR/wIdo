import React, { Component } from 'react'
import { Chart } from "react-charts";
import UserServices from "../Services/UserService";


const data = [
    {
        label: "Series 1",
        data: [{ x: "Countries", y: 17 }, { x: "Places", y: 27 }, { x: "Followers", y: 6 }]
    },
    {
        label: "Series 2",
        data: [{ x: "Countries", y: 9 }, { x: "Places", y: 23 }, { x: "Followers", y: 1 }]
    },
    {
        label: "Series 3",
        data: [{ x: "Countries", y: 6 }, { x: "Places", y: 7 }, { x: "Followers", y: 3 }]
    },
    {
        label: "Series 4",
        data: [{ x: "Countries", y: 4 }, { x: "Places", y: 4 }, { x: "Followers", y: 3 }]
    },
    {
        label: "Series 5",
        data: [{ x: "Countries", y: 3 }, { x: "Places", y: 6 }, { x: "Followers", y: 1 }]
    },
]


export default class Graphic extends Component {
    constructor(props) {
        super(props);
        this.isLoading = false;
        this.service = new UserServices();
        this.users = [];
        this.best = [];
        this.isLoading = false;
    }

    componentDidMount() {
        this.service.allUsers()
            .then(allUsers => {
                this.users = allUsers
                let unCountries = [];
                this.best = this.users.map(elem => {
                    unCountries = [];
                    elem.countries.forEach(element => {
                        if (!unCountries.includes(element)) {
                            unCountries.push(element)
                        }
                    });
                    return {
                        countriesGood: unCountries.length,
                        places: elem.places.length,
                        followers: elem.followers.length,
                        name: elem.name,
                    }
                })
                this.best.sort((a, b) => {
                    if (a.countriesGood > b.countriesGood) {
                        return -1;
                    }

                    if (a.countriesGood < b.countriesGood) {
                        return 1;
                    }

                    return 0;
                });
                this.best = this.best.slice(0, 5);
                this.isLoading = true;
                console.log(this.best);
            });
    }

    render() {
        console.log(this.best)
        return (
            <div className="graphic">
                <div
                    style={{
                        width: "1200px",
                        height: "600px"
                    }}
                >
                    <br /><br />
                    <Chart
                        data={data}
                        axes={[
                            { primary: true, type: "ordinal", position: "bottom" },
                            { type: "linear", position: "left" }
                        ]}
                    />
                    <div className="list-name">
                        <h3 className="line1 line">1.IviLópez</h3>
                        <h3 className="line2 line">2.Sonia_LR</h3>
                        <h3 className="line3 line">3.Francho</h3>
                        <h3 className="line4 line">4.Rafael</h3>
                        <h3 className="line5 line">5.Cristina</h3>
                    </div>
                </div>
            </div>
        )
    }
}