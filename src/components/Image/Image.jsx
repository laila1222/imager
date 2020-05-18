import React, { Component } from "react";
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

  onDownloadClick = (id, urls) => {
    // console.log(id, download, downloadLocation);
    console.log("download clicked");
    

    unsplash.photos
      .getPhoto(id)
      .then((res) => 
         res.json() )
      .then((json) => {
        console.log(json);
        unsplash.photos
          .downloadPhoto(json)
          .then((res) => res.json())
          .then((json) => {
            window.open(`${json.url}.jpg`, 'Download');
            console.log(json)});
      });
  };

  render() {
    console.log(this.props.urls);
    return (
      <div className="image">
        <div className="image-container">
          <img
            src={this.props.src}
            alt={this.props.alt_description}
            className="image__img"
          />
        </div>

        <div className="image__links">
          
            <FontAwesomeIcon
              icon={faDownload}
              className="image__icon image__icon--download"
              onClick={() =>
                this.onDownloadClick(
                  this.props.id,
                  this.props.urls
                )
              }
            />


          <div className="user">
            <img
              src={this.props.user_data.profile_image.small}
              alt="user"
              className="user__img"
            />
            <p className="user__name">{this.props.user_data.username}</p>
          </div>
        </div>
      </div>
    );
  }
}

export default Image;
