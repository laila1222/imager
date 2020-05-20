import React, { Component } from "react";
import SmallSearch from "../components/SmallSearch/SmallSearch";
import ImageDisplay from "../components/ImageDisplay/ImageDisplay";
import Modal from "../components/Modal/Modal";
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
      moreThanTen: true,
      modalOpen: false,
      currentSearchUrl: '',
      selectedImage: {}
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
  inputHandler = () => {
    this.initialImageRender(this.returnSearchWord());
  };

  // For child parent communication
  modalController = () => {
    console.log("do something with modal");
    // Toggle for modal open state
    this.setState(
      (prevState) => ({ modalOpen: !prevState.modalOpen }),
      () => {
        console.log(this.state.modalOpen);
      }
    );
  };

  initialImageRender = (searchWord) => {
    this.setState({ isLoading: true, hasMore: true, moreThanTen: true }, () => {
      // First render of photos
      unsplash.search
        .photos(searchWord, 1, 30)
        .then((res) => res.json())
        .then((data) => {
          console.log(data);

          // If no results, loader will stop/disappear and error message will pop up (due to hasMore: true)
          if (data.results.length < 1) {
            this.setState({ hasMore: false, isLoading: false });
            // If there are less or equal results than 10,
          } else if (data.results.length <= 10) {
            this.setState({ moreThanTen: false });
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

  imageSelected = (data) => {
    this.setState({ selectedImage: data }, ()=>{ console.log(this.state.selectedImage);});
  }


  componentDidMount = () => {
    this.initialImageRender(this.returnSearchWord());
    // Save search url in state
    const currentSearchUrl = window.location.pathname.concat(window.location.search);
    console.log(currentSearchUrl);
    this.setState({ currentSearchUrl });

    const query = new URLSearchParams(window.location.search);
    
    const checkId = query.get("id");
    console.log(checkId);
    
  };

  render() {
    return (
      <div className="photos-page-container">
        <SmallSearch inputHandler={this.inputHandler} />

        <ImageDisplay
          firstCol={this.state.firstCol}
          secondCol={this.state.secondCol}
          thirdCol={this.state.thirdCol}
          isLoading={this.state.isLoading}
          hasMore={this.state.hasMore}
          moreThanTen={this.state.moreThanTen}
          modalController={this.modalController}
          imageSelected={this.imageSelected}
          
        />

        {this.state.modalOpen && <Modal modalController={this.modalController} currentSearchUrl={this.state.currentSearchUrl} selectedImageData={this.state.selectedImage} />}
      </div>
    );
  }
}

export default PhotosPage;
