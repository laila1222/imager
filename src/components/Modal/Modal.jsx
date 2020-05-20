import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import "./Modal.scss";

class Modal extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  closeModal = () => {
      console.log('close modal');
      this.props.modalController();
  }

  render() {
    return (
      <div className="modal-container">
          <div className="modal-layer" onClick={() => this.closeModal()}><FontAwesomeIcon className="modal__icon" icon={faTimes} /></div>
        
        <div className="modal u-center-middle"></div>
      </div>
    );
  }
}

export default Modal;
