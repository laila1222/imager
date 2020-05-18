import React, { Component } from "react";
import SearchBar from "../components/SearchBar/SearchBar";
import ImageDisplay from "../components/ImageDisplay/ImageDisplay";
import './HomePage.scss';

// ES Modules syntax
import Unsplash from "unsplash-js";
// Unsplash access key
const accessKey = process.env.REACT_APP_ACCESS_KEY;
// New unsplash instance using unsplash access key
const unsplash = new Unsplash({ accessKey });

class HomePage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      firstCol: [],
      secondCol: [],
      thirdCol: [],
      inputValue: "",
    };
  }

 



 

  getRandomPhotos = () => {
    unsplash.photos.listPhotos(1, 30, "latest")
    .then(res => res.json())
    .then(data => {
      console.log(data);
      const firstCol = data.slice(0, 9);
        const secondCol = data.slice(10, 19);
        const thirdCol = data.slice(20, 29);

        this.setState({ firstCol });
        this.setState({ secondCol });
        this.setState({ thirdCol });
    })
  }

  componentDidMount = () => {
    this.getRandomPhotos();
  };

  render() {
    return (
      <React.Fragment>
        <SearchBar
          handler={this.handler}
          imagesDisplayed={this.state.imagesDisplayed}
        />
        <ImageDisplay firstCol={this.state.firstCol} secondCol={this.state.secondCol} thirdCol={this.state.thirdCol} />
      </React.Fragment>
    );
  }
}

export default HomePage;
