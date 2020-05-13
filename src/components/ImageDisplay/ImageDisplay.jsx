import React, { Component } from "react";

import "./ImageDisplay.scss";





class ImageDisplay extends Component {
 



  render() {
      console.log(this.props);
    return (
      <section className="image-display-section image-display">
          {/* Display images */}
          {this.props.imagesArray ? 
          (this.props.imagesArray.map(image => {
              return (
                  <img src={image.urls.small} alt="image" />
              )
          })) : <div>No image</div>
        }
      </section>
    );
  }
}

export default ImageDisplay;
