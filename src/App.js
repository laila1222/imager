import React from "react";
import SearchBar from "./components/SearchBar/SearchBar";
import ImageDisplay from "./components/ImageDisplay/ImageDisplay";
import axios from "axios";
import "./css/style.css";

function App() {
  return (
    <React.Fragment>
      <SearchBar />
      <ImageDisplay />
    </React.Fragment>
  );
}

export default App;
