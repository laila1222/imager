import React from "react";
import "./ErrorMessage.scss";

function ErrorMessage() {
  return (
    <div className="error-message u-center-middle u-margin-bottom-medium">
      <p className="error-message__text">Oops! There are no results.</p>
      <p className="error-message__text">Try searching for another word.</p>
    </div>
  );
}

export default ErrorMessage;
