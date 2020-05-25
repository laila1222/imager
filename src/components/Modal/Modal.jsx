import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { faDownload } from "@fortawesome/free-solid-svg-icons";
import "./Modal.scss";
// ES Modules syntax
import Unsplash from "unsplash-js";
// Unsplash access key
const accessKey = process.env.REACT_APP_ACCESS_KEY;
// New unsplash instance using unsplash access key
const unsplash = new Unsplash({ accessKey });

class Modal extends Component {
  closeModal = () => {
    console.log("close modal");
    //   Closing modal in parent component
    this.props.modalController();
    //   Url gets back to /photos?search={searchword}
    this.props.history.push(this.props.currentSearchUrl);
  };

  cutDateString = (longDate) => {
    //   Shorten the date that comes from api
    return longDate.slice(0, 10);
  };

  onDownloadClick = (id) => {
    console.log("download clicked");

    unsplash.photos
      .getPhoto(id)
      .then((res) => res.json())
      .then((json) => {
        unsplash.photos
          .downloadPhoto(json)
          .then((res) => res.json())
          .then((json) => {
            window.open(`${json.url}.jpg`, "Download");
          });
      });
  };

  render() {
    const imageData = this.props.selectedImageData;
    return (
      <div className="modal-container">
        <div className="modal-layer" onClick={() => this.closeModal()}>
          <FontAwesomeIcon className="modal__icon" icon={faTimes} />
        </div>

        <div className="modal u-center-middle">
          <div className="modal__info__user">
            <a
              href={imageData.user.links.html}
              target="_blank"
              rel="noopener noreferrer"
              className="modal__user__link"
            >
              <img
                src={this.props.selectedImageData.user.profile_image.small}
                alt="user profile"
                className="modal__user__img"
              />

              <p className="modal__user__name">
                {this.props.selectedImageData.user.name}
              </p>
            </a>
          </div>

          <div
            className="download-button"
            onClick={() => this.onDownloadClick(imageData.id)}
          >
            <FontAwesomeIcon
              icon={faDownload}
              className="download-button__icon"
            />
            <p className="download-button__text">Download from here</p>
          </div>

          <div className="modal__image-container">
            <img
              src={this.props.selectedImageData.urls.small}
              alt={this.props.selectedImageData.alt_description}
              className="modal__image u-center-middle"
            />
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Modal);
