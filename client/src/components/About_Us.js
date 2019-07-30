import React, { Component } from 'react';
import Footer from './Footer';

export default class About_Us extends Component {
    render() {
        return (
            <div className={'background-general background-index-52'}>
                <div className="content-about-us">
                    <div className="about-us">
                        <h3 className="title-about-us">Ironhack Madrid, Iván López Ruiz final project´s.</h3>
                        <h5>Special thanks to Dani Vicario <span>🧘‍</span>, Sito <span>🏍</span>, Luca <span>🇮🇹</span>, Raluca <span>🍸</span> and all my Ironhack brothers: </h5>
                        <ul className="list-about-us">
                            <li>Carlos <span>🎧</span></li>
                            <li>Vanesa <span>👵</span></li>
                            <li>Jesús <span>⛹‍</span></li>
                            <li>Gabi <span>🎮</span></li>
                            <li>Rubén <span>🕺</span></li>
                            <li>Rafa <span>⚖</span></li>
                            <li>Javi <span>🏝</span></li>
                            <li>Francho <span>🛴</span></li>
                            <li>Sergio <span> 👨‍👩‍👧‍</span></li>
                            <li>Juan <span>🇬🇧</span></li>
                            <li>Micael <span>🚂</span></li>
                            <li>Miriam <span>🍕</span></li>
                            <li>Agustín <span>♻</span></li>
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
