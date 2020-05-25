import React, { Component } from "react";
import Logo from "../Logo/Logo";
import CreatedBy from "../CreatedBy/CreatedBy";
import { withRouter } from "react-router-dom";
import "./SearchBar.scss";

class SearchBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      inputValue: "",
    };
  }

  // Change state.inputValue when user types in input field
  handleInputChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  // On submit call handler function with the inputValue
  handleOnSubmit = (event) => {
    event.preventDefault();
    this.props.history.push(`/photos?search=${this.state.inputValue}`);
  };

  render() {
    return (
      <section
        className="section-searchbar searchbar"
        ref={this.searchbarSectionRef}
      >
        <Logo classes={this.state.logoClasses} />
        <CreatedBy />
        <form
          className="searchbar__form u-center-middle "
          onSubmit={this.handleOnSubmit}
        >
          <h1 className="searchbar__headline">
            Find beautiful and free photos
          </h1>
          <input
            type="text"
            className="searchbar__input"
            placeholder="Search for an image..."
            onChange={this.handleInputChange}
            name="inputValue"
          />
          <a onClick={this.handleOnSubmit} className="searchbar__button">Search</a>
        </form>
      </section>
    );
  }
}

export default withRouter(SearchBar);
