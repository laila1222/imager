import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import "./Modal.scss";

class Modal extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  closeModal = () => {
    console.log("close modal");
    //   Closing modal in parent component
    this.props.modalController();
    //   Url gets back to /photos?search={searchword}
    this.props.history.push(this.props.currentSearchUrl);
  };

  render() {
      const imageData = this.props.selectedImageData;
    return (
    
      <div className="modal-container">
        <div className="modal-layer" onClick={() => this.closeModal()}>
          <FontAwesomeIcon className="modal__icon" icon={faTimes} />
        </div>

        <div className="modal u-center-middle">
          <div className="modal__info">
                
                <img src={this.props.selectedImageData.user.profile_image.small} alt="user profile" className="modal__user__img"/>
                <p className="modal__user__name">{this.props.selectedImageData.user.name}</p>

                <p className="modal__info-text">Created at: {imageData.created_at}</p>

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
