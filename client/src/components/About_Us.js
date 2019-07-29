import React, { Component } from 'react';
import Footer from './Footer';

export default class About_Us extends Component {
    render() {
        return (
            <div className={'background-general background-index-52'}>
                <div className="content-about-us">
                    <div className="about-us">
                        <h3 className="title-about-us">Ironhack Madrid, Iván López Ruiz final project´s.</h3>
                        <h5>Special thanks to Dani Vicario 🧘‍♂, Sito 🏍, Luca 🇮🇹, Raluca 🍸 and all my Ironhack brothers: </h5>
                        <ul className="list-about-us">
                            <li>Carlos 🎧</li>
                            <li>Vanesa 👵</li>
                            <li>Jesús ⛹‍♂</li>
                            <li>Gabi 🎮</li>
                            <li>Rubén 🕺</li>
                            <li>Rafa ⚖</li>
                            <li>Javi 🏝</li>
                            <li>Francho 🛴</li>
                            <li>Sergio 👨‍👩‍👧‍👦</li>
                            <li>Juan 🇬🇧</li>
                            <li>Micael 🚂</li>
                            <li>Miriam 🍕</li>
                            <li>Agustín ♻</li>
                        </ul>

                    </div>
                    <div className="img-container-about-us">
                        <img src="IMG_5928.JPG" className="img-about-us"></img>
                    </div>
                </div>
                <Footer></Footer>
            </div>
        )
    }
}
