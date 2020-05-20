import React, { Component } from "react";
import Image from "../Image/Image";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
// Loader
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

import "./ImageDisplay.scss";

class ImageDisplay extends Component {
  render() {
    return (
      <React.Fragment>
        <div className="image-display-section image-display image-display__container">
          {/* If there are less than ten images, display it in one row, in middle of page */}
          {this.props.moreThanTen ? (
            <React.Fragment>
              <div className="image-display__col image-display__col-1">
                {this.props.firstCol ? (
                  this.props.firstCol.map((image) => {
                    return (
                      <Image
                        modalController={this.props.modalController}
                        imageSelected={this.props.imageSelected}
                        key={image.id}
                        image_data={image}
                        
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
                        image_data={image}
                        key={image.id}
                        modalController={this.props.modalController}
                        imageSelected={this.props.imageSelected}
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
                        image_data={image}
                        key={image.id}
                        modalController={this.props.modalController}
                        imageSelected={this.props.imageSelected}
                      />
                    );
                  })
                ) : (
                  <div></div>
                )}
              </div>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <div className="image-display__col image-display__col-1">
                {this.props.firstCol ? (
                  this.props.firstCol.map((image) => {
                    return (
                      <Image
                      image_data={image}
                      key={image.id}
                        modalController={this.props.modalController}
                        imageSelected={this.props.imageSelected}
                      />
                    );
                  })
                ) : (
                  <div></div>
                )}
              </div>
            </React.Fragment>
          )}
        </div>
        <div className="action-container">
          <div className="loader">
            {this.props.isLoading ? (
              <Loader
                type="Circles"
                color="#045c50"
                height={50}
                width={50}
                className="u-center-middle u-margin-bottom-medium"
              />
            ) : (
              <React.Fragment />
            )}
            {!this.props.hasMore ? <ErrorMessage /> : <div></div>}
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default ImageDisplay;
