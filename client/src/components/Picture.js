import React, { Component } from 'react'

export default class Picture extends Component {
    render() {
        return (
            <div className={'background-general background-index-' + Math.floor(Math.random() * 73 + 1)}>
                <div className="content-adapt">
                    <div className="container-edit">
                        <img src={this.props.imgName} alt={this.props.imgName} className="picture-change" id="picture" />
                        <form className="input-change-picture" action="./update-pict" method="POST" id="form-container" enctype="multipart/form-data">
                            <section>
                                <input class="file-picture" type="file" name="photo" id="picture" required />
                            </section>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}
