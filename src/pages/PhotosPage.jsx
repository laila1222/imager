import React, { Component } from "react";
import SmallSearch from "../components/SmallSearch/SmallSearch";
import ImageDisplay from "../components/ImageDisplay/ImageDisplay";
// For infinite scroll
import debounce from "lodash.debounce";
// ES Modules syntax
import Unsplash from "unsplash-js";

// CSS
import "./PhotosPage.scss";

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
      isLoading: false,
      error: false,
      hasMore: true,
      pageNumber: 1,
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
        this.renderMoreImages(this.returnSearchWord());
      }
    }, 100);
  }

  // For child parent communication
  // When child (input) calls this function, change state.inputValue, then search for images with the new searchWord/inputvalue
  inputHandler = (inputValue) => {
    console.log(inputValue);
    // this.setState({ inputValue }, () => {
    //   this.searchForImage(this.returnSearchWord());
    // });
    console.log("searchWord", this.returnSearchWord());
    this.initialImageRender(this.returnSearchWord());
  };

  initialImageRender = (searchWord) => {
    this.setState({ isLoading: true, hasMore: true }, () => {
      // First render of photos
      unsplash.search
        .photos(searchWord, 1, 30)
        .then((res) => res.json())
        .then((data) => {
          console.log(data);

          if (data.results.length < 1) {
            this.setState({ hasMore: false, isLoading: false }, ()=>{ console.log(this.state.isLoading);});
          }

          const firstTenImages = data.results.slice(0, 9);
          const secondTenImages = data.results.slice(10, 19);
          const thirdTenImages = data.results.slice(20, 29);

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
    });
  };

  // When user scrolls to bottom of the page, this function renders more images
  renderMoreImages = (searchWord) => {
    // Start Loader
    this.setState({ isLoading: true }, () => {
      console.log(this.state.hasMore);
      unsplash.search
        .photos(searchWord, this.state.pageNumber + 1, 30)
        .then((res) => res.json())
        .then((data) => {
          if (data.results.length < 1) {
            this.setState({ hasMore: false, isLoading: false });
          } else {
            const firstTenImages = data.results.slice(0, 10);
            const secondTenImages = data.results.slice(10, 20);
            const thirdTenImages = data.results.slice(20, 30);
            // A new page number is needed for unpslash-js to get new images
            const newPageNumber = this.state.pageNumber + 1;

            // Add new data to existing array in state, turn off loader
            this.setState({
              firstCol: [...this.state.firstCol, ...firstTenImages],
              secondCol: [...this.state.secondCol, ...secondTenImages],
              thirdCol: [...this.state.thirdCol, ...thirdTenImages],
              isLoading: false,
              pageNumber: newPageNumber,
            });
          }
        })
        .catch((err) => {
          this.setState({
            error: err.message,
            isLoading: false,
          });
        });
    });
  };

  returnSearchWord = () => {
    const query = new URLSearchParams(window.location.search);
    const searchWord = query.get("search");
    return searchWord;
  };

  checkForMoreImage = () => {};

  componentDidMount = () => {
    this.initialImageRender(this.returnSearchWord());
  };

  render() {
    return (
      <div>
        <SmallSearch inputHandler={this.inputHandler} />
       
          <ImageDisplay
            firstCol={this.state.firstCol}
            secondCol={this.state.secondCol}
            thirdCol={this.state.thirdCol}
            isLoading={this.state.isLoading}
            hasMore={this.state.hasMore}
          />
        
      </div>
    );
  }
}

export default PhotosPage;
