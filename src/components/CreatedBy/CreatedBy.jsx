import React from "react";
import "./CreatedBy.scss";

function CreatedBy() {
  return (
    <div className="created-by">
      <h2 className="created-by__headline">Created by: </h2>
      <a
        href="https://github.com/Laila1222"
        target="_blank"
        rel="noopener noreferrer"
        className="created-by__link"
      >
        Lilla Kőrösi
      </a>
    </div>
  );
}

export default CreatedBy;
