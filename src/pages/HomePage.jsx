import React, { Component } from "react";
import SearchBar from "../components/SearchBar/SearchBar";
import ImageDisplay from "../components/ImageDisplay/ImageDisplay";
// For infinite scroll
import request from "superagent";
import debounce from "lodash.debounce";

// CSS
import "./HomePage.scss";

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
      isLoading: false,
      error: false,
      hasMore: true,
      pageNumber: 1, 
      moreThanTen: true
    };

    // Binds scroll event handler
    window.onscroll = debounce(() => {
      const {
        loadImages,
        state: { error, isLoading, hasMore },
      } = this;

      // Bails early if:
      // * there's an error
      // * it's already loading
      // * there's nothing left to load
      if (error || isLoading || !hasMore) return;

      // Checks that the page has scrolled to the bottom
      if (
        window.innerHeight + document.documentElement.scrollTop ===
        document.documentElement.offsetHeight
      ) {
        this.getRandomPhotos();
      }
    }, 100);
  }

  getRandomPhotos = () => {
    console.log("getRandomPhotos is fired");
    this.setState({ isLoading: true }, () => {
      // Check if coloumns are empty or have already data
      if (this.state.thirdCol.length === 0) {
        // First render of photos
        unsplash.photos
          .listPhotos(this.state.pageNumber, 30, "latest")
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
            const firstTenImages = data.slice(0, 10);
            const secondTenImages = data.slice(10, 20);
            const thirdTenImages = data.slice(20, 30);

            // Fill the empty columns, turn off loader
            this.setState({
              firstCol: firstTenImages,
              secondCol: secondTenImages,
              thirdCol: thirdTenImages,
              isLoading: false,
            });
          })
          .catch((err) => {
            this.setState({
              error: err.message,
              isLoading: false,
            });
          });
      } else {
        // Render more images
        unsplash.photos
          .listPhotos((this.state.pageNumber + 1), 30, "latest")
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
            const firstTenImages = data.slice(0, 10);
            const secondTenImages = data.slice(10, 20);
            const thirdTenImages = data.slice(20, 30);
            // A new page number is needed for unpslash-js to get new images
            const newPageNumber = this.state.pageNumber + 1;

            // Add new data to existing array in state
            this.setState({
              firstCol: [...this.state.firstCol, ...firstTenImages],
              secondCol: [...this.state.secondCol, ...secondTenImages],
              thirdCol: [...this.state.thirdCol, ...thirdTenImages],
              isLoading: false,
              pageNumber: newPageNumber
            });
          })
          .catch((err) => {
            this.setState({
              error: err.message,
              isLoading: false,
            });
          });
      }
    });
  };

  // Initial render of images
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
        <ImageDisplay
          firstCol={this.state.firstCol}
          secondCol={this.state.secondCol}
          thirdCol={this.state.thirdCol}
          isLoading={this.state.isLoading}
          moreThanTen={this.state.moreThanTen}
        />
      </React.Fragment>
    );
  }
}

export default HomePage;
