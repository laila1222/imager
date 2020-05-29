import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload } from "@fortawesome/free-solid-svg-icons";
import "./Image.scss";
// ES Modules syntax
import Unsplash from "unsplash-js";
// Unsplash access key
const accessKey = process.env.REACT_APP_ACCESS_KEY;
// New unsplash instance using unsplash access key
const unsplash = new Unsplash({ accessKey });

class Image extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  onImageClick = (id, image_data) => {
    // Add image id to url
    // this.props.history.push(`/photos/modal/${id}`);
    // Call the modalController function sent from (grand)Parent ;)
    this.props.modalController();

    // Parent component will know the selected image
    this.props.imageSelected(image_data);
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
    return (
      <div className="image">
        <div className="image-container">
          <div
            className="image__layer"
            onClick={() =>
              this.onImageClick(this.props.image_data.id, this.props.image_data)
            }
          ></div>
          <img
            src={this.props.image_data.urls.small}
            alt={this.props.image_data.alt_description}
            className="image__img"
          />
        </div>

        <div className="image__links">
          <FontAwesomeIcon
            icon={faDownload}
            className="image__icon image__icon--download"
            onClick={() => this.onDownloadClick(this.props.image_data.id)}
          />

          <div className="user">
            <a
              href={this.props.image_data.user.links.html}
              target="_blank"
              rel="noopener noreferrer"
              className="user__link"
            >
              <img
                src={this.props.image_data.user.profile_image.small}
                alt="user"
                className="user__img"
              />
              <p className="user__name">
                {this.props.image_data.user.username}
              </p>
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Image);
