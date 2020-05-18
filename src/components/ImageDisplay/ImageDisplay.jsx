import React, { Component } from "react";
import Image from "../Image/Image";
// Loader
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

import "./ImageDisplay.scss";

class ImageDisplay extends Component {
  render() {
    return (
      <div className="image-display-section image-display image-display__container">
        <div className="image-display__col image-display__col-1">
          {this.props.firstCol ? (
            this.props.firstCol.map((image) => {
              return (
                <Image
                  user_data={image.user}
                  src={image.urls.small}
                  alt_description={image.alt_description}
                  key={image.id}
                  id={image.id}
                  links={image.links}
                  urls={image.urls}
                />
              );
            })
          ) : (
            <div></div>
          )}
        </div>
        <div className="image-display__col image-display__col-1">
          {this.props.secondCol ? (
            this.props.secondCol.map((image) => {
              return (
                <Image
                  user_data={image.user}
                  src={image.urls.small}
                  alt_description={image.alt_description}
                  key={image.id}
                  id={image.id}
                  links={image.links}
                  urls={image.urls}
                />
              );
            })
          ) : (
            <div></div>
          )}
        </div>
        <div className="image-display__col image-display__col-1">
          {this.props.thirdCol ? (
            this.props.thirdCol.map((image) => {
              return (
                <Image
                  user_data={image.user}
                  src={image.urls.small}
                  alt_description={image.alt_description}
                  key={image.id}
                  id={image.id}
                  links={image.links}
                  urls={image.urls}
                />
              );
            })
          ) : (
            <div></div>
          )}
        </div>

        <div className="loader">
          {this.props.isLoading ? (
            <Loader type="Circles" color="#045c50" height={50} width={50} />
          ) : (
            <React.Fragment />
          )}
        </div>
      </div>
    );
  }
}

export default ImageDisplay;
