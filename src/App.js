import React, { Component } from 'react'
import SearchBar from "./components/SearchBar/SearchBar";
import ImageDisplay from "./components/ImageDisplay/ImageDisplay";
import axios from "axios";
import "./css/style.css";
// ES Modules syntax
import Unsplash from "unsplash-js";

const accessKey = process.env.REACT_APP_ACCESS_KEY;

const unsplash = new Unsplash({  accessKey  });

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
         imagesArray: [],
         searchWord: ''
    }
  }

// For child parent communication
// When child (input) calls this function, change state.searchWord, then search for images with the new searchWord
  handler = (inputValue) => {
    console.log(inputValue);
    this.setState({searchWord: inputValue}, () => {
      this.searchForImage(this.state.searchWord);
    })
    
  }


  searchForImage = (searchWord) => {
    // const searchWord = this.state.searchword;
    console.log(searchWord);
    unsplash.search
    .photos(searchWord, 1, 10, { orientation: "portrait" })
    .then((res) => res.json())
    .then((data) => {
      console.log(data.results);
      this.setState({imagesArray: data.results});
    });
  }

  componentDidMount = () => {
    const word = "nature"
    this.searchForImage(word);
  }

  render() {
    return (
      <React.Fragment>
      <SearchBar handler={this.handler} />
      <ImageDisplay imagesArray={this.state.imagesArray} />
    </React.Fragment>
    )
  }
}

export default App

