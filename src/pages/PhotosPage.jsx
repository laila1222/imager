import React, { Component } from "react";
import SmallSearch from "../components/SmallSearch/SmallSearch";
import ImageDisplay from "../components/ImageDisplay/ImageDisplay";
import "./PhotosPage.scss";

// ES Modules syntax
import Unsplash from "unsplash-js";
// Unsplash access key
const accessKey = process.env.REACT_APP_ACCESS_KEY;
// New unsplash instance using unsplash access key
const unsplash = new Unsplash({ accessKey });

class PhotosPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      firstCol: [],
      secondCol: [],
      thirdCol: [],
      inputValue: "",
    };
  }

  // For child parent communication
  // When child (input) calls this function, change state.inputValue, then search for images with the new searchWord/inputvalue
  inputHandler = (inputValue) => {
    console.log(inputValue);
    this.setState({ inputValue }, () => {
      this.searchForImage(this.state.inputValue);
    });
  };

  searchForImage = (searchWord) => {
    unsplash.search
      .photos(searchWord, 1, 30)
      .then((res) => res.json())
      .then((data) => {
        console.log(data.results);
        const firstCol = data.results.slice(0, 9);
        const secondCol = data.results.slice(10, 19);
        const thirdCol = data.results.slice(20, 29);
        console.log(firstCol, secondCol, thirdCol);

        this.setState({ firstCol });
        this.setState({ secondCol });
        this.setState({ thirdCol });
      });
  };

  returnSearchWord = () => {
    const query = new URLSearchParams(window.location.search);
    const searchWord = query.get("search");
    return searchWord;
  };

  componentDidMount = () => {
    this.searchForImage(this.returnSearchWord());
  };

  render() {
    return (
      <div>
        <SmallSearch inputHandler={this.inputHandler} />
        <ImageDisplay firstCol={this.state.firstCol} secondCol={this.state.secondCol} thirdCol={this.state.thirdCol} />
      </div>
    );
  }
}

export default PhotosPage;
