import React, { Component } from "react";
import Logo from "../Logo/Logo";
import "./SearchBar.scss";

class SearchBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      inputValue: "",
      imagesDisplayed: false,
      logoClasses: {
        logoClass: "logo__img",
        containerClass: "logo__container",
        headlineClass: "logo__headline-primary",
      },
      searchBarClasses: "section-searchbar searchbar",
      searchBarInputClasses:
        "u-center-middle u-margin-top-medium searchbar__input",
    };

    this.searchbarSectionRef = React.createRef();
  }

  checkDisplay = () => {
    const searchbarSection = this.searchbarSectionRef.current;
    // if (this.state.imagesDisplayed) {
    //   searchbarSection.style.height = "20vh";
    // }
    // Give new classes to Logo, that will modify it's appearance
    this.setState({
      logoClasses: {
        logoClass: "logo__img logo__img--move",
        containerClass: "logo__container logo__container--move",
        headlineClass: "logo__headline-primary logo__headline-primary--move",
      },
    });
    this.setState({
      searchBarInputClasses:
        "u-center-middle u-margin-top-medium searchbar__input searchbar__input--move",
    });
    this.setState({
      searchBarInputClasses:
        "searchbar__input searchbar__input--move",
    });
  };

  // Change state.inputValue when user types in input field
  handleInputChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  // On submit call handler function with the inputValue
  handleOnSubmit = (event) => {
    event.preventDefault();
    this.props.handler(this.state.inputValue);
    this.setState({ imagesDisplayed: true }, () => {
      this.checkDisplay();
    });
  };

  render() {
    return (
      <section
        className={this.state.searchBarClasses}
        ref={this.searchbarSectionRef}
      >
        <Logo classes={this.state.logoClasses} />
        <form className="searchbar__form" onSubmit={this.handleOnSubmit}>
          <input
            type="text"
            className={this.state.searchBarInputClasses}
            placeholder="Search for an image..."
            onChange={this.handleInputChange}
            name="inputValue"
          />
        </form>
      </section>
    );
  }
}

export default SearchBar;
