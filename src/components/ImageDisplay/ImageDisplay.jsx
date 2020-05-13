import React, { Component } from 'react';
import Image from '../../images/-1.jpg';

import './ImageDisplay.scss';

class ImageDisplay extends Component {
    constructor(props) {
        super(props)

        this.state = {
                 
        }
    }

    render() {
        return (
            <section className="image-display-section image-display">
                <img src={Image} alt="" className="image-display__img"/>
            </section>
        )
    }
}

export default ImageDisplay;
